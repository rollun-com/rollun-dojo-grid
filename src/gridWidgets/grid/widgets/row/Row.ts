import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import { DNode, VNodeProperties } from '@dojo/framework/widget-core/interfaces';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';
import CellContainer from '../../../../containers/grid/CellContainer';
import { FieldInfo, RowFields } from '../../../../common/interfaces';

export interface RowProps {
	rowFields: RowFields;
	rowIndex: number;
	key: string;
	isSelected: boolean;
	contextName: string;

	onSelect(): void;
}

export class Row extends WidgetBase<RowProps> {

	protected render(): DNode {
		return this.basicRender();
	}

	private basicRender(): DNode {
		const {rowFields, rowIndex, contextName, isSelected} = this.properties;
		return v(
			'tr',
			this.getRowNodeProperties(),
			rowFields.fieldsInfo.map((fieldInfo: FieldInfo, columnIndex: number): DNode => {
					return w(CellContainer, {contextName, rowIndex, columnIndex, isSelected, key: `cell-${rowIndex}-${columnIndex}`});
				}
			)
		);
	}

	private getRowNodeProperties(): VNodeProperties {
		const {isSelected} = this.properties;
		const properties: VNodeProperties = {
			classes: `${bs.borderBottom} ${isSelected ? bs.bgLight : ''}`,
			onclick: () => {
				if (!isSelected) {
					this.properties.onSelect();
				}
			}
		};
		return properties;
	}
}
