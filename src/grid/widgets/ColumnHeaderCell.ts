import { v } from '@dojo/framework/widget-core/d';
import { ColumnInfo } from '../../common/interfaces';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import * as css from '../../styles/header.m.css';
import { VNode } from '@dojo/framework/widget-core/interfaces';

export interface ColumnHeaderCellProps {
	column: ColumnInfo;
}

export default class ColumnHeaderCell extends WidgetBase<ColumnHeaderCellProps> {
	protected render(): VNode {
		const {column} = this.properties;
		return v('th', {classes: css.cell}, [
			v('span', {}, [column.label || column.field]),
			v('div', {})// TODO: sort arrow
		]);
	}
}
