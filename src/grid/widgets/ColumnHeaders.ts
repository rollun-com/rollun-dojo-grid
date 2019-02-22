import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { ColumnInfo } from '../../common/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import ColumnHeaderCell from './ColumnHeaderCell';
import { VNode } from '@dojo/framework/widget-core/interfaces';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';

export interface ColumnHeadersProps {
	columns: ColumnInfo[];
}

export default class ColumnHeaders extends WidgetBase<ColumnHeadersProps> {
	protected render(): VNode {
		const {columns} = this.properties;
		return v('div', {}, [
			v('div',
				{
					classes: `${bootstrap.dFlex} ${bootstrap.flexRow} ${bootstrap.border}`,
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
