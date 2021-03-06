/*
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import Dialog from 'rollun-common-widgets/dist/all/widgets/Dialog';
import { w, v } from '@dojo/framework/widget-core/d';
import RecordCreationForm from './RecordCreationForm';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';
import { RowFields } from '../common/interfaces';

export interface RecordCreatorProps {
	rowFields: RowFields;
	onNewItemCreation(item: {}): void;
}

export default class NewRecordCreator extends WidgetBase<RecordCreatorProps> {
	private openDialog = false;

	protected render(): DNode {
		return v('div', {classes: `${bootstrap.mx2}`}, [
			v('button', {
					classes: `${bootstrap.btn}  ${bootstrap.btnPrimary} ${bootstrap.btnBlock}`, onclick: () => {
						this.openDialog = true;
						this.invalidate();
					}
				},
				['Add new item']),
			// @ts-ignore FIXME: why type here is wrong?
			w(Dialog, {
					title: 'Add new item',
					isOpen: this.openDialog,
					onClose: () => {
						this.openDialog = false;
						this.invalidate();
					},
					options: {
						centered: true
					}
				},
				[this.getCreationForm()]
			)
		]);
	}

	private getCreationForm(): DNode {
		const {rowFields, onNewItemCreation} = this.properties;
		return w(RecordCreationForm, {
			rowFields,
			onNewItemCreation: (item: {}) => {
				onNewItemCreation(item);
				this.openDialog = false;
				this.invalidate();
			}
		});
	}
}
*/
