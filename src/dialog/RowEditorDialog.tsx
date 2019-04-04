import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';
import { tsx } from '@dojo/framework/widget-core/tsx';
import FluidForm, { FluidFormField } from '../form/FluidForm';
import Dialog from './Dialog';

export interface RowEditorDialogProps {
	item: any;
	selectedRowIndex: number;
	isOpen: boolean;
	openDialog(): void;
	closeDialog(): void;
	formConfig?: FluidFormField[];
	title?: string;

	onFormSubmit(rowIndex: number, data: {}): void;
}

export default class RowEditorDialog extends WidgetBase<RowEditorDialogProps> {

	protected render(): DNode | DNode[] {
		const {formConfig, item, selectedRowIndex, title, isOpen} = this.properties;
		const onFormSubmit = (data: {}) => {
			this.properties.onFormSubmit(selectedRowIndex, data);
		};
		return (<div>
			<button
				class={`${bs.btn} ${bs.btnPrimary} ${bs.btnSm}`}
				onclick={
					() => {
						this.properties.openDialog();
					}
				}
				disabled={!selectedRowIndex}
			>
				Edit selected row
			</button>
			<Dialog isOpen={isOpen}
					title={title}
					onClose={
						() => {
							this.properties.closeDialog();
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
