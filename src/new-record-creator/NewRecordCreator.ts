import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DataStoreResponseDependent } from '../common/interfaces';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import Dialog from '@dojo/widgets/dialog';
import { w, v } from '@dojo/framework/widget-core/d';
import theme from '@dojo/themes/dojo';
import RecordCreationForm from './RecordCreationForm';

export interface RecordCreatorProps extends DataStoreResponseDependent {

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
		const {responseInfo, onNewItemCreation} = this.properties;
		return w(RecordCreationForm, {
			responseInfo,
			onNewItemCreation: (item: {}) => {
				onNewItemCreation(item);
				this.openDialog = false;
				this.invalidate();
			}
		});
	}
}
