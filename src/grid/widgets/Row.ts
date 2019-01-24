import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import * as css from '../../styles/row.m.css';
import { v, w } from '@dojo/framework/widget-core/d';
import { ColumnInfo } from '../../common/interfaces';
import { DNode, VNode } from '@dojo/framework/widget-core/interfaces';
import Cell from './Cell';
import RowEditor from './editors/RowEditor';

export interface RowProps {
	columns: ColumnInfo[];
	item: {};

	onItemUpdate(item: {}): void;

	editorRenderer?(column: ColumnInfo, value: string, state: {}): DNode;
}

export default class Row extends WidgetBase<RowProps> {
	private isEdited = false;

	protected render(): VNode {
		const {columns, item, editorRenderer} = this.properties;
		const onItemUpdate = (item: {}) => {
			this.properties.onItemUpdate(item);
			this.isEdited = false;
			this.invalidate();
		};
		const onUpdateCancel = () => {
			this.isEdited = false;
			this.invalidate();
		};
		if (this.isEdited) {
			return v('div', {
				classes: css.editedRow
			}, [
				w(RowEditor, {columns, item, onItemUpdate, editorRenderer, onUpdateCancel})
			]);
		}
		return v('div', {
				classes: css.row,
				ondblclick: () => {
					this.isEdited = true;
					this.invalidate();
				}
			},
			columns.map((column: ColumnInfo): DNode => {
					const value: any = item[column.field];
					const content: string = String(value);
					return w(Cell, {content, column, value});
				}
			));
	}
}
