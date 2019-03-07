import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode, VNodeProperties } from '@dojo/framework/widget-core/interfaces';
import { v } from '@dojo/framework/widget-core/d';
import { ColumnInfo } from '../../common/interfaces';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';

namespace RGrid.Widgets.Grid.Cell {

	export interface CellProps {
		rowIndex: number;
		columnIndex: number;
		content: string;
		columnInfo: ColumnInfo;
	}

	export class Cell extends WidgetBase<CellProps> {
		protected render(): DNode {
			return v('div',
				this.getCellNodeProperties(),
				[
					this.getContent()
				]
			);
		}

		private getCellNodeProperties(): VNodeProperties {
			const cellNodeProps: VNodeProperties = {
				classes: `${bootstrap.dFlex} ${bootstrap.p1} ${bootstrap.alignItemsCenter} ${bootstrap.borderLeft}`,
				styles: {
					flex: '1 0',
				}
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

		protected getContent(): DNode {
			const {content} = this.properties;
			const {formatter} = this.properties.columnInfo;
			let processedContent: DNode = content;
			if (formatter) {
				processedContent = formatter(processedContent);
			}
			return processedContent;
		}
	}
}
