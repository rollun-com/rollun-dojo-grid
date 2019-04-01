import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';
import { tsx } from '@dojo/framework/widget-core/tsx';
import FluidForm, { FluidFormField } from '../form/FluidForm';
import Dialog from './Dialog';

export interface RowEditorDialogProps {
	item: any;
	selectedRowIndex: number;
	formConfig?: FluidFormField[];

	onFormSubmit(rowIndex: number, data: {}): void;
}

export default class RowEditorDialog extends WidgetBase<RowEditorDialogProps> {
	private openDialog = false;

	protected render(): DNode | DNode[] {
		const {formConfig, item, selectedRowIndex} = this.properties;
		const onFormSubmit = (data: {}) => {
			this.properties.onFormSubmit(selectedRowIndex, data);
			this.openDialog = false;
			this.invalidate();
		};
		return (<div>
			<button
				class={`${bs.btn} ${bs.btnPrimary} ${bs.btnSm}`}
				onclick={
					() => {
						this.openDialog = true;
						this.invalidate();
					}
				}
			>
				Edit selected row
			</button>
			<Dialog isOpen={this.openDialog}
					onClose={
						() => {
							this.openDialog = false;
							this.invalidate();
						}
					}
					options={{
						size: 2,
						centered: true
					}}
			>
				<FluidForm formConfig={formConfig} onFormSubmit={onFormSubmit} initialValues={item}>

				</FluidForm>
			</Dialog>
		</div>);
	}
}
