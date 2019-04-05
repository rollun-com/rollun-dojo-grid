import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import Dialog from '../../../dialog/Dialog';
import ChildNodeCreationForm from './ChildNodeCreationForm';
import { RqlNodeFactoryParams } from '../../../rqlNodeFactory/RqlNodeFactory';
import { w } from '@dojo/framework/widget-core/d';

export interface ChildNodeCreationFormDialogProps {
	onChildNodeCreate(nodeName: string, params: RqlNodeFactoryParams): void;

	closeDialog(): void;

	isOpen: boolean;
	fieldNames: string[];
}

export default class ChildNodeCreationFormDialog extends WidgetBase<ChildNodeCreationFormDialogProps> {

	protected render(): DNode {
		const {isOpen, closeDialog, onChildNodeCreate, fieldNames} = this.properties;
		return w(Dialog, {
				title: 'Create new node',
				isOpen,
				onClose: () => {
					closeDialog();
				},
				options: {
					centered: true
				}
			},
			[
				w(ChildNodeCreationForm, {
					onChildNodeCreate: (nodeName: string, params: RqlNodeFactoryParams) => {
						onChildNodeCreate(nodeName, params);
						closeDialog();
					},
					fieldNames
				})
			]
		);
	}
}
