import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode, VNodeProperties } from '@dojo/framework/widget-core/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import { CellData } from '../../common/interfaces';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';
import CellEditorContainer from '../../containers/CellEditorContainer';

export interface CellProps extends CellData {
	rowIndex: number;
	columnIndex: number;
	key: string;
	isEditable?: boolean;
}

export class Cell extends WidgetBase<CellProps> {
	private isEdited: boolean;

	protected render(): DNode {
		return v('div',
			this.getCellNodeProperties(),
			[
				this.getValue()
			]
		);
	}

	private getCellNodeProperties(): VNodeProperties {
		const cellNodeProps: VNodeProperties = {
			classes: `${bootstrap.dFlex} ${bootstrap.p1} ${bootstrap.alignItemsCenter} ${bootstrap.borderLeft}`,
			styles: {
				flex: '1 0',
			}
		};
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
