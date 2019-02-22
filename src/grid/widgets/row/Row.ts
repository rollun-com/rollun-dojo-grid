import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import { ColumnInfo } from '../../../common/interfaces';
import { DNode, VNodeProperties } from '@dojo/framework/widget-core/interfaces';
import Cell from '../Cell';
import RowEditor from '../editors/RowEditor';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';
import * as ownCss from './row.m.css';

export interface RowProps {
	columns: ColumnInfo[];
	item: {};

	onItemUpdate?(item: {}): void;

	editorRenderer?(column: ColumnInfo, value: string, state: {}): DNode;
}

export default class Row extends WidgetBase<RowProps> {
	private isEdited = false;

	protected render(): DNode {
		if (this.properties.onItemUpdate) {
			return this.renderWithEditors();
		}
		return this.basicRender();
	}

	private renderWithEditors(): DNode {
		const {columns, item, editorRenderer} = this.properties;
		const onItemUpdate = (item: {}) => {
			// @ts-ignore
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
				classes: `${bootstrap.dFlex} ${bootstrap.flexRow} ${bootstrap.borderBottom} ${ownCss.editedRow}`,
			}, [
				w(RowEditor, {columns, item, onItemUpdate, editorRenderer, onUpdateCancel})
			]);
		}

		return v('div',
			this.getRowNodeProperties(),
			columns.map((columnInfo: ColumnInfo): DNode => {
					const value: any = item[columnInfo.field];
					const content: string = String(value);
					return w(Cell, {content, columnInfo});
				}
			)
		);
	}

	private basicRender(): DNode {
		const {columns, item} = this.properties;
		return v('div',
			this.getRowNodeProperties(),
			columns.map((columnInfo: ColumnInfo): DNode => {
					const value: any = item[columnInfo.field];
					const content: string = String(value);
					return w(Cell, {content, columnInfo});
				}
			)
		);
	}

	private getRowNodeProperties(): VNodeProperties {
		const properties: VNodeProperties = {
			classes: `${bootstrap.dFlex} ${bootstrap.flexRow} ${bootstrap.borderBottom}`,
		};
		if (this.properties.onItemUpdate) {
			properties.ondblclick = () => {
				this.isEdited = true;
				this.invalidate();
			};
		}
		return properties;
	}
}
