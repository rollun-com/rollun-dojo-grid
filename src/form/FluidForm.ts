import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { Constructor, DNode } from '@dojo/framework/widget-core/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import TextInput from '@dojo/widgets/text-input';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';

export interface EditorProps {
	value: string;

	onChange(newValue: string): void;
}

export interface FluidFormField {
	field: string;
	label?: string;
	editor?: Constructor<WidgetBase<EditorProps>>;

	validator?(value: string): boolean;
}

export interface FluidFormProps {
	formConfig: FluidFormField[];
	initialValues?: { [key: string]: string };

	onFormSubmit(formData: {}): void;
}

export default class FluidForm extends WidgetBase<FluidFormProps> {
	private data = {};
	private validRegistry = {};
	private isStarted: boolean;

	protected render(): DNode {
		if (!this.isStarted) {
			this.data = {...this.data, ...this.properties.initialValues};
			this.isStarted = true;
		}
		return v('div',
			{classes: `${bs.dFlex} ${bs.flexColumn}`},
			[
				v('form',
					{
						classes: `${bs.mb3}`
					},
					this.properties.formConfig.map((formField) => {
						return v('div',
							{
								classes: `${bs.formGroup}`
							},
							[
								v('div',
									{
										classes: `${bs.colFormLabel}`
									},
									[
										formField.label || formField.field
									]
								),
								this.getEditorForFormField(formField)
							]
						);
					})
				),
				v('div',
					{
						classes: `${bs.p3} ${bs.borderTop}`
					},
					[
						v('button',
							{
								classes: `${bs.btn}  ${bs.btnPrimary} ${bs.btnBlock}`,
								onclick: () => {
									this.properties.onFormSubmit(Object.assign({}, this.data));
									this.data = {};
								}
							},
							[
								'Confirm'
							]
						)
					])

			]
		);
	}

	private getEditorForFormField(formField: FluidFormField): DNode {
		if (formField.editor) {
			return w(formField.editor, {
				value: this.data[formField.field], onChange: (value: string) => {
					this.data[formField.field] = value;
					if (formField.validator) {
						this.validRegistry[formField.field] = formField.validator(value);
					} else {
						this.validRegistry[formField.field] = true;
					}
					this.invalidate();
				}
			});
		} else {
			return w(TextInput, {
				extraClasses: {
					input: `${bs.formControl}`
				},
				invalid: this.validRegistry[formField.field],
				value: this.data[formField.field],
				onChange: (value: string) => {
					this.data[formField.field] = value;
					if (formField.validator) {
						this.validRegistry[formField.field] = formField.validator(value);
					} else {
						this.validRegistry[formField.field] = false;
					}
					this.invalidate();
				}
			});
		}
	}
}
