import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import Query from 'rollun-ts-rql/dist/Query';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';
import Dialog from '../dialog/Dialog';
import QueryEditorContext from '../context/QueryEditorContext';
import QueryEditorContainer from '../containers/queryBuilder/queryEditorContainer';

export interface QueryEditorContainerModalProps {
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
		}
		const {applyQuery} = this.properties;
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
								w(QueryEditorContainer, {}),
							]
						),
						v('btn',
							{
								classes: `${bs.btn} ${bs.btnPrimary}`,
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
						classes: `${bs.btn} ${bs.btnPrimary}`,
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
