import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { Constructor, DNode } from '@dojo/framework/widget-core/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import TextInput from '@dojo/widgets/text-input';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';

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

	onFormSubmit(formData: {}): void;
}

export default class FluidForm extends WidgetBase<FluidFormProps> {
	private data = {};
	private validRegisrty = {};

	protected render(): DNode {
		return v('div',
			{classes: `${bootstrap.dFlex} ${bootstrap.flexColumn}`},
			[
				v('div',
					{classes: `${bootstrap.dFlex} ${bootstrap.flexColumn}`},
					this.properties.formConfig.map((formField) => {
						return v('div',
							{
								classes: `${bootstrap.dFlex} ${bootstrap.flexColumn}`
							}, [
								v('div', {
								}, [formField.label || formField.field]),
								this.getEditorForFormField(formField)
							]
						);
					})
				),
				v('button',
					{
						classes: `${bootstrap.btn}  ${bootstrap.btnPrimary} ${bootstrap.btnBlock}`,
						onclick: () => {
							this.properties.onFormSubmit(Object.assign({}, this.data));
							this.data = {};
						}
					},
					['Add']
				)
			]
		);
	}

	private getEditorForFormField(formField: FluidFormField): DNode {
		if (formField.editor) {
			return w(formField.editor, {
				value: this.data[formField.field], onChange: (value: string) => {
					this.data[formField.field] = value;
					if (formField.validator) {
						this.validRegisrty[formField.field] = formField.validator(value);
					} else {
						this.validRegisrty[formField.field] = true;
					}
					this.invalidate();
				}
			});
		} else {
			return w(TextInput, {
				extraClasses: {
					input: `${bootstrap.formControl}`
				},
				invalid: this.validRegisrty[formField.field],
				value: this.data[formField.field],
				onChange: (value: string) => {
					this.data[formField.field] = value;
					if (formField.validator) {
						this.validRegisrty[formField.field] = formField.validator(value);
					} else {
						this.validRegisrty[formField.field] = false;
					}
					this.invalidate();
				}
			});
		}
	}
}
