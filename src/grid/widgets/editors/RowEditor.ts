import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { Column } from '../interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import { VNode, DNode } from '@dojo/framework/widget-core/interfaces';
import * as cellCss from '../../../styles/cell.m.css';
import TextInput from '@dojo/widgets/text-input';
import theme from '@dojo/themes/dojo';

export interface RowEditorProps {
	columns: Column[];
	item: {};

	editorRenderer?(column: Column, value: string, state: {}): DNode

	onItemUpdate(item: {}): void;
}

export default class RowEditor extends WidgetBase<RowEditorProps> {
	private isStarted = false;
	private state = {};

	protected render(): VNode {
		const {columns, item} = this.properties;
		if (!this.isStarted) {
			this.state = item;
			if (document.onkeyup) {// FIXME: implement open editor managing
				document.onkeyup(new KeyboardEvent('keyup', {code: 'Enter'}));
			}
			this.isStarted = true;
		}
		document.onkeyup = (event: KeyboardEvent) => {
			if (event.code === 'Enter') {
				const newItem = Object.assign({}, this.state);
				this.properties.onItemUpdate(newItem);
				document.onkeyup = () => {
				};
			}
		};
		return v('div', {
				classes: cellCss.cell
			},
			columns.map((column) => {
				return this.renderEditor(column, this.state[column.field]);
			})
		);
	}

	private renderEditor(column: Column, value: string): DNode {
		if (this.properties.editorRenderer) {
			return this.properties.editorRenderer(column, value, this.state);
		}
		return v('div',
			{classes: cellCss.cell},
			[
				w(TextInput, {
					theme,
					extraClasses: {
						root: ''
					},
					value,
					onInput: (value: string): void => {
						this.state[column.field] = value;
						this.invalidate();
					}
				})
			]
		);
	}
}
