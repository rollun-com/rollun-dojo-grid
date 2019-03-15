import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import { DNode, VNodeProperties } from '@dojo/framework/widget-core/interfaces';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';
import CellContainer from '../../../containers/CellContainer';
import { FieldInfo, RowFields } from '../../../common/interfaces';

export interface RowProps {
	rowFields: RowFields;
	rowIndex: number;
	key: string;
}

export class Row extends WidgetBase<RowProps> {

	protected render(): DNode {
		return this.basicRender();
	}

	private basicRender(): DNode {
		const {rowFields, rowIndex} = this.properties;
		return v(
			'div',
			this.getRowNodeProperties(),
			rowFields.fieldsInfo.map((fieldInfo: FieldInfo, columnIndex: number): DNode => {
					return w(CellContainer, {rowIndex, columnIndex, key: `cell-${rowIndex}-${columnIndex}`});
				}
			)
		);
	}

	private getRowNodeProperties(): VNodeProperties {
		const properties: VNodeProperties = {
			classes: `${bootstrap.dFlex} ${bootstrap.flexRow} ${bootstrap.borderBottom}`,
		};
		return properties;
	}
}
