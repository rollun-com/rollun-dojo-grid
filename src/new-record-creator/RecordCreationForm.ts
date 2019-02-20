import { DNode } from '@dojo/framework/widget-core/interfaces';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import { RecordCreatorProps } from './NewRecordCreator';

export default class RecordCreationForm extends WidgetBase<RecordCreatorProps> {
	private state = {};

	protected render(): DNode {
		const {fieldsInfo} = this.properties.responseInfo;
		return v('div',
			{classes: 'd-flex flex-column'},
			[
				v('div', {classes: 'd-flex flex-column mb-4'}, fieldsInfo.map((fieldInfo) => {
					return v('div', {classes: 'd-flex flex-column mb-1'}, [
						v('h5', {
							classes: ''
						}, [fieldInfo.label || fieldInfo.field]),
						v('input',
							{
								type: 'text',
								classes: 'form-control',
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
						classes: 'btn btn-primary btn-block',
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
