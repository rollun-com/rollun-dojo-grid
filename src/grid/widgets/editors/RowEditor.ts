import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { Column } from '../interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import * as css from '../../../styles/rowEditor.m.css';
import TextInput from '@dojo/widgets/text-input';
import theme from '@dojo/themes/dojo';

export interface RowEditorProps {
	columns: Column[];
	item: {};

	editorRenderer?(column: Column, value: string, state: {}): DNode;

	onItemUpdate(item: {}): void;

	onUpdateCancel(): void;
}

export default class RowEditor extends WidgetBase<RowEditorProps> {
	private isStarted = false;
	private state = {};

	protected render(): DNode[] {
		const {columns, item} = this.properties;
		if (!this.isStarted) {
			this.state = item;
			if (document.onkeyup) {// FIXME: implement open editor managing
				document.onkeyup(new KeyboardEvent('keyup', {code: 'Escape'}));
			}
			this.isStarted = true;
		}
		document.onkeyup = (event: KeyboardEvent) => {
			switch (event.code) {
				case 'Enter':
					this.finishEditing();
					break;
				case 'Escape':
					this.cancelEditing();
					break;
			}
		};
		return [
			v('button',
				{
					classes: css.okButton + ' btn btn-success btn-sm float-left',
					onclick: () => {
						this.finishEditing();
					}
				},
				['OK']
			),
			v('button',
				{
					classes: css.cancelButton + ' btn btn-danger btn-sm float-left',
					onclick: () => {
						this.cancelEditing();
					}
				},
				[' X ']
			),
			...columns.map((column) => {
				return this.renderEditor(column, this.state[column.field]);
			})
		];
	}

	private finishEditing(): void {
		const newItem = Object.assign({}, this.state);
		this.properties.onItemUpdate(newItem);
		document.onkeyup = () => {
		};
	}

	private cancelEditing(): void {
		this.properties.onUpdateCancel();
		document.onkeyup = () => {
		};
	}

	private renderEditor(column: Column, value: string): DNode {
		if (this.properties.editorRenderer) {
			return this.properties.editorRenderer(column, value, this.state);
		}
		return v('div',
			{classes: css.cellEditor},
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
