import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { CellProps } from '../Cell';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { v } from '@dojo/framework/widget-core/d';

export interface CellEditorProps extends CellProps {
	onCellValueUpdate(rowIndex: number, columnIndex: number, value: string);

	onStopEditing();
}

export default class CellEditor extends WidgetBase<CellEditorProps> {
	protected value: string;

	protected onAttach(): void {
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
	}

	protected render(): DNode | DNode[] {
		return v('div', {}, [
			v('input',
				{
					type: 'text',
					classes: '',
					value: this.value,
					oninput: (event: Event) => {
						// @ts-ignore
						this.value = event.target.value;
						this.invalidate();
					},
					onblur: () => {
						this.finishEditing();
					}
				}
			)
		]);
	}

	protected finishEditing(): void {
		const {rowIndex, columnIndex} = this.properties;
		this.properties.onCellValueUpdate(rowIndex, columnIndex, this.value);
		this.properties.onStopEditing();
	}

	protected cancelEditing(): void {
		this.properties.onStopEditing();
	}

	protected onDetach(): void {
		delete document.onkeyup;
	}
}
