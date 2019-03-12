/*
import { DNode } from '@dojo/framework/widget-core/interfaces';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import { RecordCreatorProps } from './NewRecordCreator';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';

export default class RecordCreationForm extends WidgetBase<RecordCreatorProps> {
	private state = {};

	protected render(): DNode {
		const {fieldsInfo} = this.properties.responseInfo;
		return v('div',
			{classes: `${bootstrap.dFlex} ${bootstrap.flexColumn}`},
			[
				v('div', {classes: `${bootstrap.dFlex} ${bootstrap.flexColumn} ${bootstrap.mb4}`}, fieldsInfo.map((fieldInfo) => {
					return v('div', {classes: `${bootstrap.dFlex} ${bootstrap.flexColumn} ${bootstrap.mb1}`}, [
						v('h5', {
							classes: ''
						}, [fieldInfo.label || fieldInfo.field]),
						v('input',
							{
								type: 'text',
								classes: `${bootstrap.formControl}`,
								value: this.state[fieldInfo.field],
								onchange: (event: Event) => {
									// @ts-ignore
									this.state[fieldInfo.field] = event.target.value;
									this.invalidate();
								}
							}
						)
					]);
				})),
				v('button',
					{
						classes: `${bootstrap.btn}  ${bootstrap.btnPrimary} ${bootstrap.btnBlock}`,
						onclick: () => {
							this.properties.onNewItemCreation(Object.assign({}, this.state));
							this.state = {};
						}
					},
					['Add']
				)
			]
		);
	}
}
*/
