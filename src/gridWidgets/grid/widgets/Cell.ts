import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode, VNodeProperties } from '@dojo/framework/widget-core/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import { CellData, GridCellEditor } from '../../../common/interfaces';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';
import * as ownCss from './cell.m.css';
import CellEditorContainer from '../../../containers/grid/CellEditorContainer';

export interface CellProps extends CellData {
	rowIndex: number;
	columnIndex: number;
	key: string;
	isEditable?: boolean;
	minWidth?: number;
	contextName: string;
	isSelected?: boolean;
	editor?: GridCellEditor;

	renderer?(value: string): DNode;
}

export class Cell extends WidgetBase<CellProps> {
	private isEdited: boolean;

	protected render(): DNode {
		return v('td',
			this.getCellNodeProperties(),
			[
				this.properties.isSelected && !this.isEdited
					? this.addTooltipToValue()
					: this.getProcessedValue()
			]
		);
	}

	private getCellNodeProperties(): VNodeProperties {
		const cellNodeProps: VNodeProperties = {
			classes: `${bootstrap.p1} ${bootstrap.alignItemsCenter} ${bootstrap.borderLeft}`,
			styles: {
				minWidth: '100px'
			}
		};
		if (this.properties.minWidth) {
			cellNodeProps.styles.minWidth = this.properties.minWidth + 'px';
		}
		if (this.properties.isEditable) {
			cellNodeProps.ondblclick = () => {
				this.isEdited = true;
				this.invalidate();
			};
		}
		return cellNodeProps;
	}

	protected getProcessedValue(): DNode {
		const {rowIndex, columnIndex, contextName, editor, value} = this.properties;
		if (this.isEdited) {
			const onStopEditing = () => {
				this.isEdited = false;
				this.invalidate();
			};
			return w(editor ? editor : CellEditorContainer, {contextName, rowIndex, columnIndex, onStopEditing});
		} else {
			return this.properties.renderer
				? this.properties.renderer(value)
				: value;

		}
	}

	protected addTooltipToValue(): DNode {
		const {value} = this.properties;
		return v('div',
			{classes: `${ownCss.tooltip}`},
			[
				this.getProcessedValue(),
				v('span',
					{classes: `${ownCss.tooltipText}`},
					[
						value
					]
				)
			]
		);
	}
}
