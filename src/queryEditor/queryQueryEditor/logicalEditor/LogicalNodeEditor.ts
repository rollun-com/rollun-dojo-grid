import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import AbstractLogicalNode from 'rollun-ts-rql/dist/nodes/logicalNodes/AbstractLogicalNode';
import AbstractQueryNode from 'rollun-ts-rql/dist/nodes/AbstractQueryNode';
import AbstractScalarNode from 'rollun-ts-rql/dist/nodes/scalarNodes/AbstractScalarNode';
import AbstractArrayNode from 'rollun-ts-rql/dist/nodes/arrayNodes/AbstractArrayNode';
import { WNode, DNode } from '@dojo/framework/widget-core/interfaces';
import RqlNodeFactory, { RqlNodeFactoryParams } from '../../../rqlNodeFactory/RqlNodeFactory';
import ChildNodeCreationForm from './ChildNodeCreationForm';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';
import * as fa from 'rollun-common/dist/css/fontawesome.m.css';
import * as faSolid from 'rollun-common/dist/css/solid.m.css';
import * as css from './logicalNode.m.css';
import Dialog from '../../../dialog/Dialog';
import ScalarNodeEditorContainer from '../../../containers/queryBuilder/scalarNodeEditorContainer';
import LogicalNodeEditorContainer from '../../../containers/queryBuilder/logicalNodeEditorContainer';
import ArrayNodeEditorContainer from '../../../containers/queryBuilder/arrayNodeEditorContainer';
import diffProperty from '@dojo/framework/widget-core/decorators/diffProperty';
import { undefinedSafeDiffNode } from '../../../common/functions';

export interface LogicalNodeEditorProps {
	path: number[];
	node: AbstractLogicalNode| null;
	fieldNames: string[];
	key: string;

	onRemove(path: number[]): void;

	onAddChildNode(node: AbstractQueryNode, index?: number);
}

export default class LogicalNodeEditor extends WidgetBase<LogicalNodeEditorProps> {
	private openDialog = false;

	private nodeFactory: RqlNodeFactory;

	constructor() {
		super();
		this.nodeFactory = new RqlNodeFactory();
	}

	@diffProperty('node', undefinedSafeDiffNode)
	protected render(): DNode {
		return v('div', {classes: `${bs.dFlex} ${bs.flexColumn} ${css.root}`}, [
				v('div', {classes: `${bs.dFlex} ${bs.flexRow} ${bs.bgInfo} ${bs.textWhite} ${bs.p1} ${css.controls}`},
					[
						v('div', {classes: `${bs.dFlex} ${bs.justifyContentStart} ${css.titleContainer}`}, [
							v('div', {classes: `${bs.m1} ${css.title}`},
								[this.getNodeName()]
							)
						]),
						v('div', {classes: `${bs.dFlex} ${bs.justifyContentEnd} ${css.controlsButtonsContainer}`}, [
							v('div', {classes: css.controlsButtons}, [
								v('button',
									{
										classes: `${bs.btn} ${bs.btnLight} ${bs.btnSm} ${bs.mx2}`,
										onclick: () => {
											this.addChildNode();
										}
									},
									[
										v('i', {classes: `${faSolid.fas} ${fa.faPlus}`})
									]),
								v('button',
									{
										classes: `${bs.btn} ${bs.btnDanger} ${bs.btnSm}`,
										onclick: () => {
											this.properties.onRemove(this.properties.path);
										}
									},
									[
										v('i', {classes: `${faSolid.fas} ${fa.faTimes}`})
									])
							])
						])
					]),
				v('div',
					{classes: `${bs.dFlex} ${bs.flexColumn} ${bs.p2} ${css.childNodesContainer}`},
					this.properties.node.subNodes.map(
						(node: AbstractQueryNode, index: number) => {
							const currentChildPath = this.properties.path.concat([index]);
							const key = `query-${currentChildPath.join('-')}`;
							switch (true) {
								case (node instanceof AbstractLogicalNode):
									return w(LogicalNodeEditorContainer, {
										path: currentChildPath,
										key,
									});
								case (node instanceof AbstractScalarNode):
									return w(ScalarNodeEditorContainer, {
										path: currentChildPath,
										key
									});
								case (node instanceof AbstractArrayNode):
									return w(ArrayNodeEditorContainer, {
										path: currentChildPath,
										key
									});
							}
						}
					)),
				w(Dialog, {
						title: 'Create new node',
						isOpen: this.openDialog,
						onClose: () => {
							this.openDialog = false;
							this.invalidate();
						},
						options: {
							centered: true
						}
					},
					[
						this.getChildNodeCreationMenu()
					]
				)
			]
		);
	}

	protected getNodeName(): DNode {
		return v('div', {}, [this.properties.node.name]);
	}

	private addChildNode() {
		this.openDialog = true;
		this.invalidate();
	}

	private getChildNodeCreationMenu(): WNode {
		return w(ChildNodeCreationForm, {
			onChildNodeCreate: (nodeName: string, params: RqlNodeFactoryParams) => {
				this.createChildNode(nodeName, params);
			},
			fieldNames: this.properties.fieldNames
		});
	}

	private createChildNode(nodeName: string, params: RqlNodeFactoryParams) {
		this.openDialog = false;
		this.properties.onAddChildNode(this.nodeFactory.createNode(nodeName, params));
		this.invalidate();
	}
}
