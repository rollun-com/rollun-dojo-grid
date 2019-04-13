import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { FieldInfo, RowFields } from '../../../common/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import { VNode } from '@dojo/framework/widget-core/interfaces';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';
import ColumnHeaderCellContainer from '../../../containers/grid/ColumnHeaderCellContainer';

export interface ColumnHeadersProps {
	rowFields: RowFields;
	contextName: string;
}

export class ColumnHeaders extends WidgetBase<ColumnHeadersProps> {
	protected render(): VNode {
		const {rowFields, contextName} = this.properties;
		return v('tr',
			{
				classes: `${bootstrap.border}`,
				styles: {
					backgroundColor: '#f4f6f7'
				}
			},
			rowFields.fieldsInfo.map((fieldInfo: FieldInfo, columnIndex: number) => {
				return w(ColumnHeaderCellContainer, {columnIndex, contextName, rowIndex: 0});
			})
		);
	}
}
