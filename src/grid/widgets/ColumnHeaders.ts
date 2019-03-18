import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { FieldInfo, RowFields } from '../../common/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import { VNode } from '@dojo/framework/widget-core/interfaces';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';
import ColumnHeaderCellContainer from '../../containers/ColumnHeaderCellContainer';

export interface ColumnHeadersProps {
	fields: RowFields;
}

export class ColumnHeaders extends WidgetBase<ColumnHeadersProps> {
	protected render(): VNode {
		const {fields} = this.properties;
		return v('tr',
				{
					classes: `${bootstrap.border}`,
					styles: {
						backgroundColor: '#f4f6f7'
					}
				},
				fields.fieldsInfo.map((fieldInfo: FieldInfo, columnIndex: number) => {
					return w(ColumnHeaderCellContainer, {columnIndex, rowIndex: 0});
				})
			);
	}
}
