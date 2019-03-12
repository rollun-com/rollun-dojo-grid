import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode, VNodeProperties } from '@dojo/framework/widget-core/interfaces';
import { v } from '@dojo/framework/widget-core/d';
import { CellData } from '../../common/interfaces';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';

export interface CellProps extends CellData {
	rowIndex: number;
	columnIndex: number;
	key: string;
}

export class Cell extends WidgetBase<CellProps> {
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
		return cellNodeProps;
	}

	protected getValue(): DNode {
		return this.properties.value;
	}
}
