import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import { DNode, VNodeProperties } from '@dojo/framework/widget-core/interfaces';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';
import CellContainer from '../../../containers/CellContainer';
import { FieldInfo, RowFields } from '../../../common/interfaces';

export interface RowProps {
	fields: RowFields;
	rowIndex: number;
}

export class Row extends WidgetBase<RowProps> {

	protected render(): DNode {
		return this.basicRender();
	}

	private basicRender(): DNode {
		const {fields, rowIndex} = this.properties;
		return v(
			'div',
			this.getRowNodeProperties(),
			fields.fieldsInfo.map((fieldInfo: FieldInfo, columnIndex: number): DNode => {
					return w(CellContainer, {rowIndex, columnIndex});
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
