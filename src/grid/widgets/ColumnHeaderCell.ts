import { v } from '@dojo/framework/widget-core/d';
import { ColumnInfo } from '../../common/interfaces';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import * as css from '../../styles/header.m.css';
import { VNode, VNodeProperties } from '@dojo/framework/widget-core/interfaces';

export interface ColumnHeaderCellProps {
	columnInfo: ColumnInfo;
}

export default class ColumnHeaderCell extends WidgetBase<ColumnHeaderCellProps> {
	protected render(): VNode {
		const {columnInfo} = this.properties;
		return v('div',
			this.getCellNodeProperties(),
			[
				v('span', {}, [columnInfo.label || columnInfo.field]),
				v('span', {})// TODO: sort arrow
			]);
	}

	private getCellNodeProperties(): VNodeProperties {
		const cellNodeProps: VNodeProperties = {
			classes: css.cell,
			styles: {}
		};
		const {minWidth, widthWeight} = this.properties.columnInfo;
		if (minWidth) {
			// @ts-ignore
			cellNodeProps.styles.flexBasis = minWidth + 'px';
		}
		if (widthWeight) {
			// @ts-ignore
			cellNodeProps.styles.flexGrow = `${widthWeight}`;
		}
		return cellNodeProps;
	}
}
