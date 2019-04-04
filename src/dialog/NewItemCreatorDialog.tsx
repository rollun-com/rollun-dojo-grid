import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';
import { tsx } from '@dojo/framework/widget-core/tsx';
import FluidForm, { FluidFormField } from '../form/FluidForm';
import Dialog from './Dialog';

export interface NewItemCreatorDialogProps {
	formConfig: FluidFormField[];
	isOpen: boolean;
	openDialog(): void;
	closeDialog(): void;
	title?: string;

	onFormSubmit(data: {}): void;
}

export default class NewItemCreatorDialog extends WidgetBase<NewItemCreatorDialogProps> {

	protected render(): DNode | DNode[] {
		const {formConfig, title, isOpen} = this.properties;
		const onFormSubmit = (data: {}) => {
			this.properties.onFormSubmit(data);
		};
		return (<div>
			<button
				class={`${bs.btn} ${bs.btnPrimary} ${bs.btnSm}`}
				onclick={
					() => {
						this.properties.openDialog();
					}
				}
			>
				Add new item
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
				<FluidForm formConfig={formConfig} onFormSubmit={onFormSubmit}>

				</FluidForm>
			</Dialog>
		</div>);
	}
}
