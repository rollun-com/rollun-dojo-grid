import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import Query from 'rollun-ts-rql/dist/Query';
import Limit from 'rollun-ts-rql/dist/nodes/Limit';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';
import Dialog from '../dialog/Dialog';
import QueryEditorContainerModalContainer from '../containers/queryBuilder/queryEditorContainerModalContainer';

export interface EditorModalProps {
	query: Query;
	fieldNames: string[];

	applyQuery(query: Query): void;
}

export default class QueryEditorModal extends WidgetBase<EditorModalProps> {
	private openDialog = false;
	private query = new Query({limit: new Limit(20, 0)});
	private isStarted = false;
	private fieldNames: string[];

	protected render(): DNode {
		const {fieldNames, applyQuery} = this.properties;
		if (!this.isStarted && fieldNames && fieldNames.length > 0) {
			this.fieldNames = fieldNames;
			this.isStarted = true;
		}
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
								// @ts-ignore
								w(QueryEditorContainerModalContainer, {fieldNames: this.fieldNames}),
							]
						),
						v('btn',
							{
								classes: `${bs.btn} ${bs.btnPrimary}`,
								onclick: () => {
									applyQuery(this.query);
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
