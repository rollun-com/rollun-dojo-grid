import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { ColumnInfo } from '../../../common/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import TextInput from '@dojo/widgets/text-input';
import theme from '@dojo/themes/dojo';

export interface RowEditorProps {
	columns: ColumnInfo[];
	item: {};

	editorRenderer?(column: ColumnInfo, value: string, state: {}): DNode;

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
					classes: 'btn btn-success btn-sm position-relative float-left',
					onclick: () => {
						this.finishEditing();
					}
				},
				[
					v('i', {classes: 'fas fa-check'})
				]
			),
			v('button',
				{
					classes: 'btn btn-danger btn-sm position-relative float-left',
					onclick: () => {
						this.cancelEditing();
					}
				},
				[
					v('i', {classes: 'fas fa-ban'})
				]
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

	private renderEditor(column: ColumnInfo, value: string): DNode {
		if (this.properties.editorRenderer) {
			return this.properties.editorRenderer(column, value, this.state);
		}
		return v('div',
			{classes: 'd-flex p-1 flex-grow-1'},
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
