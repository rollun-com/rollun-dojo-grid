import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { ColumnInfo } from '../../common/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import ColumnHeaderCell from './ColumnHeaderCell';
import { VNode } from '@dojo/framework/widget-core/interfaces';

export interface ColumnHeadersProps {
	columns: ColumnInfo[];
}

export default class ColumnHeaders extends WidgetBase<ColumnHeadersProps> {
	protected render(): VNode {
		const {columns} = this.properties;
		return v('div', {}, [
			v('div',
				{
					classes: 'd-flex flex-row border',
					styles: {
						backgroundColor: '#f4f6f7'
					}
				},
				columns.map((columnInfo: ColumnInfo) => {
					const content = columnInfo.label || columnInfo.field;
					return w(ColumnHeaderCell, {columnInfo, content});
				})
			)
		]);
	}
}
