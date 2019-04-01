import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';
import { tsx } from '@dojo/framework/widget-core/tsx';
import FluidForm, { FluidFormField } from '../form/FluidForm';
import Dialog from './Dialog';

export interface NewItemCreatorProps {
	fieldNames: string[];

	onFormSubmit(data: {}): void;
}

export default class NewItemCreatorDialog extends WidgetBase<NewItemCreatorProps> {
	private openDialog = false;

	protected render(): DNode | DNode[] {
		const formConfig: FluidFormField[] = this.properties.fieldNames.map((value) => {
			return {field: value};
		});
		const onFormSubmit = (data: {}) => {
			this.properties.onFormSubmit(data);
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
				Add new item
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
				<FluidForm formConfig={formConfig} onFormSubmit={onFormSubmit}>

				</FluidForm>
			</Dialog>
		</div>);
	}
}
