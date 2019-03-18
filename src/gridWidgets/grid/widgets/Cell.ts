import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode, VNodeProperties } from '@dojo/framework/widget-core/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import { CellData } from '../../../common/interfaces';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';
import CellEditorContainer from '../../../containers/grid/CellEditorContainer';

export interface CellProps extends CellData {
	rowIndex: number;
	columnIndex: number;
	key: string;
	isEditable?: boolean;
	width?: number;
}

export class Cell extends WidgetBase<CellProps> {
	private isEdited: boolean;

	protected render(): DNode {
		return v('td',
			this.getCellNodeProperties(),
			[
				this.getValue()
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
		if (this.properties.width) {
			// @ts-ignore
			cellNodeProps.styles.width = this.properties.width + 'px';
		}
		if (this.properties.isEditable) {
			cellNodeProps.ondblclick = () => {
				this.isEdited = true;
				this.invalidate();
			};
		}
		return cellNodeProps;
	}

	protected getValue(): DNode {
		if (this.isEdited) {
			const {rowIndex, columnIndex} = this.properties;
			const onStopEditing = () => {
				this.isEdited = false;
				this.invalidate();
			};
			return w(CellEditorContainer, {rowIndex, columnIndex, onStopEditing});
		} else {
			return this.properties.value;
		}
	}
}
