import { DNode } from '@dojo/framework/widget-core/interfaces';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import * as css from '../styles/recordCreationForm.m.css';
import { RecordCreatorProps } from './NewRecordCreator';

export default class RecordCreationForm extends WidgetBase<RecordCreatorProps> {
	private state = {};

	protected render(): DNode {
		return v('div',
			{classes: css.root},
			[
				v('div', {classes: css.editorsContainer}, this.properties.columns.map((column) => {
					return v('div', {classes: css.fieldEditorGroup}, [
						v('div', {
							classes: css.fieldLabel
						}, [column.label || column.field]),
						v('input',
							{
								type: 'text',
								classes: 'form-control',
								value: this.state[column.field],
								onChange: (value: string) => {
									this.state[column.field] = value;
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
