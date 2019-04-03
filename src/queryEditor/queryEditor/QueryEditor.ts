import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import AbstractQueryNode from 'rollun-ts-rql/dist/nodes/AbstractQueryNode';
import Select from 'rollun-ts-rql/dist/nodes/Select';
import Sort, { SortOptions } from 'rollun-ts-rql/dist/nodes/Sort';
import SelectNodeEditor from '../selectNodeEditor/SelectNodeEditor';
import SortNodeEditor from '../sortNodeEditor/SortNodeEditor';
import Query from 'rollun-ts-rql/dist/Query';
import DropToRemoveNodeField from '../dropToRemoveNodeField/DropToRemoveNodeField';
import PossibleNodeFields from '../possibleNodeFields/PossibleNodeFields';
import { VNode, DNode } from '@dojo/framework/widget-core/interfaces';
import AbstractLogicalNode from 'rollun-ts-rql/dist/nodes/logicalNodes/AbstractLogicalNode';
import ChildNodeCreationForm from '../queryQueryEditor/logicalEditor/ChildNodeCreationForm';
import RqlNodeFactory, { RqlNodeFactoryParams } from '../../rqlNodeFactory/RqlNodeFactory';
import AbstractScalarNode from 'rollun-ts-rql/dist/nodes/scalarNodes/AbstractScalarNode';
import AbstractArrayNode from 'rollun-ts-rql/dist/nodes/arrayNodes/AbstractArrayNode';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';
import * as ownCss from './queryEditor.m.css';
import Dialog from '../../dialog/Dialog';
import QueryEditorContext, { QueryNodeNames } from '../../context/QueryEditorContext';
import ArrayNodeEditorContainer from '../../containers/queryBuilder/arrayNodeEditorContainer';
import ScalarNodeEditorContainer from '../../containers/queryBuilder/scalarNodeEditorContainer';
import LogicalNodeEditorContainer from '../../containers/queryBuilder/logicalNodeEditorContainer';
import ContextConfig from '../../common/ContextConfig';

export interface QueryEditorProps {
	query: Query;
	context: QueryEditorContext;
	fieldNames: string[];
}

export default class QueryEditor extends WidgetBase<QueryEditorProps> {

	static contextConfig = new ContextConfig(QueryEditorContext, []);

	private isStarted: boolean;
	private openQueryCreationDialog = false;
	private rqlNodeFactory = new RqlNodeFactory();
	protected context: QueryEditorContext;

	protected render(): VNode {
		if (!this.isStarted) {
			this.context = this.properties.context;
			this.context.query = this.properties.query;
			this.isStarted = true;
		}
		const nonQueryEditors: DNode[] = [
			v('div', {classes: `${bs.colMd4} ${bs.p0}`}, [
				w(PossibleNodeFields, {fieldNames: this.context.fieldNames})
			]),
			v('div', {classes: `${bs.colMd3} ${bs.p0}`}, [
				this.renderSelectNode(this.context.query.selectNode)
			]),
			v('div', {classes: `${bs.colMd3} ${bs.p0}`}, [
				this.renderSortNode(this.context.query.sortNode)
			]),
			v('div', {classes: `${bs.colMd2} ${bs.p0}`}, [
				w(DropToRemoveNodeField, {
					onNodeFieldRemove: (fieldName: string, nodeType: string) => {
						this.removeFieldFromNode(fieldName, nodeType);
					}
				})
			])
		];
		return v('div', {
			classes: `${bs.dFlex} ${bs.flexColumn} ${bs.mb3} ${bs.w100}`
		}, [
			v('div', {
					classes: `${bs.dFlex} ${bs.flexRow} ${bs.mb2} ${bs.m0} ${bs.row} ${bs.w100} ${ownCss.nonQueryEditors}`,
				},
				nonQueryEditors
			),
			v('div',
				{classes: `${bs.justifyContentCenter}`},
				[
					this.renderQueryNode(this.context.query.queryNode)
				])
		]);
	}

	private renderSelectNode(node: (Select | undefined)) {
		if (node) {
			const onRemove = () => {
				this.removeNode('select');
			};
			const onSelectNodeChange = (fields: string[]) => {
				this.context.setSelectNode(new Select(fields));
			};
			return w(SelectNodeEditor, {
				node, onRemove, fieldNames: this.context.fieldNames, onSelectNodeChange
			});
		} else {
			return v('div', {
				classes: `${bs.dFlex} ${bs.justifyContentCenter} ${bs.alignItemsCenter} ${bs.h100}`
			}, [
				v('button', {
						classes: `${bs.btn} ${bs.btnLg} ${bs.btnLight}`,
						onclick: () => {
							this.context.setSelectNode(new Select(['id']));
						}
					},
					['Add select node']
				)
			]);
		}
	}

	private renderSortNode(node: Sort) {
		if (node) {
			const onSortNodeChange = (sortOptions: SortOptions) => {
				this.context.setSortNode(new Sort(sortOptions));
				this.invalidate();
			};
			const onRemove = () => {
				this.removeNode('sort');
			};
			return w(SortNodeEditor, {node, onRemove, onSortNodeChange});
		} else {
			return v('div', {
				classes: `${bs.dFlex} ${bs.justifyContentCenter} ${bs.alignItemsCenter} ${bs.h100}`
			}, [
				v('button', {
						classes: `${bs.btn} ${bs.btnLg} ${bs.btnLight}`,
						onclick: () => {
							this.context.setSortNode(new Sort({id: 1}));
						}
					},
					['Add sort node']
				)
			]);
		}
	}

	private renderQueryNode(node: AbstractQueryNode) {
		if (node) {
			const path: number[] = [0];
			const key = `query-${path[0]}`;
			switch (true) {
				case node instanceof AbstractLogicalNode:
					return w(LogicalNodeEditorContainer, {
						path,
						key
					});
				case node instanceof AbstractScalarNode:
					return w(ScalarNodeEditorContainer, {
						path,
						key
					});
				case node instanceof AbstractArrayNode:
					return w(ArrayNodeEditorContainer, {
						path,
						key
					});
			}

		} else {
			return v('div', {}, [
				v('button', {
					classes: `${bs.btn} ${bs.btnLg} ${bs.btnLight}`,
					onclick: () => {
						this.openQueryCreationDialog = true;
						this.invalidate();
					}
				}, ['Add query node']),
				w(Dialog, {
					title: 'Create new node',
					isOpen: this.openQueryCreationDialog,
					onClose: () => {
						this.openQueryCreationDialog = false;
						this.invalidate();
					},
					options: {
						centered: true
					}
				}, [
					v('div', {},
						[
							w(ChildNodeCreationForm, {
								onChildNodeCreate: (nodeName: string, params: RqlNodeFactoryParams) => {
									this.openQueryCreationDialog = false;
									this.context.setQueryNode(this.rqlNodeFactory.createNode(nodeName, params));
								},
								fieldNames: this.properties.fieldNames
							})
						]
					)
				])
			]);
		}
	}

	private removeNode(queryNodeName: ('select' | 'sort' | 'limit' | 'query')) {
		switch (true) {
			case queryNodeName === 'select': {
				this.context.removeNode(QueryNodeNames.select);
				break;
			}
			case queryNodeName === 'sort': {
				this.context.removeNode(QueryNodeNames.sort);
				break;
			}
			case queryNodeName === 'limit': {
				this.context.removeNode(QueryNodeNames.limit);
				break;
			}
			case queryNodeName === 'query': {
				this.context.removeNode(QueryNodeNames.query);
				break;
			}
		}
	}

	private removeFieldFromNode(fieldName: string, nodeType: string) {
		switch (nodeType) {
			case 'selectnode':
				const fieldNameIndex = this.context.query.selectNode.fields.indexOf(fieldName);
				if (fieldNameIndex !== -1) {
					this.context.query.selectNode.fields.splice(fieldNameIndex, 1);
					const newFields = [...this.context.query.selectNode.fields];
					this.context.setSelectNode(new Select(newFields));
				}
				break;
			case 'sortnode':
				if (this.context.query.sortNode.sortOptions.hasOwnProperty(fieldName)) {
					delete this.context.query.sortNode.sortOptions[fieldName];
					const newSortOptions = Object.assign({}, this.context.query.sortNode.sortOptions);
					this.context.setSortNode(new Sort(newSortOptions));
				}
				break;
		}
	}
}
