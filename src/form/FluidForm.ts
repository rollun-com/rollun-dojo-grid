import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { Constructor, DNode } from '@dojo/framework/widget-core/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import * as css from '../styles/recordCreationForm.m.css';
import TextInput from '@dojo/widgets/text-input';
import theme from '@dojo/themes/dojo';

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
			{classes: css.root},
			[
				v('div',
					{classes: css.editorsContainer},
					this.properties.formConfig.map((formField) => {
						return v('div', {classes: css.fieldEditorGroup}, [
							v('div', {
								classes: css.fieldLabel
							}, [formField.label || formField.field]),
							this.getEditorForFormField(formField)
						]);

					})
				),
				v('button',
					{
						classes: 'btn btn-primary btn-block',
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
				theme,
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
