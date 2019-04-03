import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import Query from 'rollun-ts-rql/dist/Query';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';
import Dialog from '../dialog/Dialog';
import QueryEditorContext from '../context/QueryEditorContext';
import QueryEditor from '../queryEditor/queryEditor/QueryEditor';

export interface QueryEditorContainerModalProps {
	query: Query;
	fieldNames: string[];

	applyQuery(query: Query): void;

	context: QueryEditorContext;
}

export default class QueryEditorInModal extends WidgetBase<QueryEditorContainerModalProps> {
	private openDialog = false;
	private context: QueryEditorContext;
	private isStarted: boolean;

	protected render(): DNode {
		if (!this.isStarted) {
			this.context = this.properties.context;
			this.context.query = this.properties.query;
			this.isStarted = true;
		}
		const {applyQuery} = this.properties;
		this.context.fieldNames = this.properties.fieldNames;
		return v('div', {
				styles: {}
			},
			[
				w(Dialog, {
						title: 'Edit query',
						isOpen: this.openDialog,
						onClose: () => {
							this.openDialog = false;
							this.invalidate();
						},
						options: {
							size: 3,
							centered: true
						}
					},
					[
						v('div', {
								classes: `${bs.dFlex} ${bs.flexGrow1}`
							},
							[
								w(QueryEditor, {
									query: this.context.query,
									context: this.context,
									fieldNames: this.context.fieldNames
								}),
							]
						),
						v('btn',
							{
								classes: `${bs.btn} ${bs.btnPrimary} ${bs.btnSm} ${bs.justifyContentCenter}`,
								onclick: () => {
									applyQuery(this.context.query);
									this.openDialog = false;
									this.invalidate();
								}
							},
							['Apply query']
						)
					]
				),
				v('button',
					{
						classes: `${bs.btn} ${bs.btnPrimary} ${bs.btnSm}`,
						onclick: () => {
							this.openDialog = true;
							this.invalidate();
						}
					},
					['Edit query']
				)
			]
		);
	}
}
