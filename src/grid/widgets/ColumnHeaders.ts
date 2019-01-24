import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { ColumnInfo } from '../../common/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import * as css from '../../styles/header.m.css';
import ColumnHeaderCell from './ColumnHeaderCell';
import { VNode } from '@dojo/framework/widget-core/interfaces';

export interface ColumnHeadersProps {
	columns: ColumnInfo[];
}

export default class ColumnHeaders extends WidgetBase<ColumnHeadersProps> {
	protected render(): VNode {
		const {columns} = this.properties;
		return v('div', {}, [
			v('tr', {classes: css.columnHeaders}, columns.map((column: ColumnInfo) => {
				return w(ColumnHeaderCell, {column});
			}))
		]);
	}
}
