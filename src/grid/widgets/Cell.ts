import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode, VNodeProperties } from '@dojo/framework/widget-core/interfaces';
import { v } from '@dojo/framework/widget-core/d';
import * as css from '../../styles/cell.m.css';
import { ColumnInfo } from '../../common/interfaces';

export interface CellProps {
	content: string;
	columnInfo: ColumnInfo;
	value: string;
}

export default class Cell extends WidgetBase<CellProps> {
	protected render(): DNode {
		const {content} = this.properties;
		const {formatter} = this.properties.columnInfo;
		let processedContent: DNode = content;
		if (formatter) {
			processedContent = formatter(processedContent);
		}
		return v('div',
			this.getCellNodeProperties(),
			[processedContent]);
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
