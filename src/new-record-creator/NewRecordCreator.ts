import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { Column } from '../grid/widgets/interfaces';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import Dialog from '@dojo/widgets/dialog';
import { w, v } from '@dojo/framework/widget-core/d';
import theme from '@dojo/themes/dojo';
import RecordCreationForm from './RecordCreationForm';

export interface RecordCreatorProps {
	columns: Column[];

	onNewItemCreation(item: {}): void;
}

export default class NewRecordCreator extends WidgetBase<RecordCreatorProps> {
	private openDialog = false;

	protected render(): DNode {
		return v('div', {classes: 'mx-2'}, [
			v('button', {
					classes: 'btn btn-primary btn-block', onclick: () => {
						this.openDialog = true;
						this.invalidate();
					}
				},
				['Add new item']),
			w(Dialog, {
					theme,
					title: 'Add new item',
					underlay: true,
					open: this.openDialog,
					onRequestClose: () => {
						this.openDialog = false;
						this.invalidate();
					}
				},
				[this.getCreationForm()]
			)
		]);
	}

	private getCreationForm(): DNode {
		const {columns, onNewItemCreation} = this.properties;
		return w(RecordCreationForm, {
			columns,
			onNewItemCreation: (item: {}) => {
				onNewItemCreation(item);
				this.openDialog = false;
				this.invalidate();
			}
		});
	}
}
