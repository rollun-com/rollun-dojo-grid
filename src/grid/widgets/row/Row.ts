import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import { DNode, VNodeProperties } from '@dojo/framework/widget-core/interfaces';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';
import CellContainer from '../../../containers/CellContainer';
import RGrid from '../../../common/interfaces';
/// <reference path="../../../common/interfaces.ts"/>
namespace RGrid {
	export namespace Widgets {
		export namespace Grid {
			import ColumnInfo = RGrid.Interfaces.ColumnInfo;

			export interface RowProps {
				columns: RGrid.Interfaces.ColumnInfo[];
				item?: {};
				rowIndex: number;

				onItemUpdate?(item: {}): void;

				editorRenderer?(column: Interfaces.ColumnInfo, value: string, state: {}): DNode;
			}

			export class Row extends WidgetBase<RowProps> {

				protected render(): DNode {
					if (this.properties.onItemUpdate) {
						return this.renderWithEditors();
					}
					return this.basicRender();
				}

				private renderWithEditors(): DNode {
					const {columns, /*item, editorRenderer,*/ rowIndex} = this.properties;
					return v(
						'div',
						this.getRowNodeProperties(),
						columns.map((columnInfo: ColumnInfo, columnIndex: number): DNode => {
								return w(CellContainer, {rowIndex, columnIndex});
							}
						)
					);
				}

				private basicRender(): DNode {
					const {columns, rowIndex} = this.properties;
					return v(
						'div',
						this.getRowNodeProperties(),
						columns.map((columnInfo: ColumnInfo, columnIndex: number): DNode => {
								console.log(`cell # ${rowIndex} ${columnIndex} w()`);
								return w(CellContainer, {rowIndex, columnIndex});
							}
						)
					);
				}

				private getRowNodeProperties(): VNodeProperties {
					const properties: VNodeProperties = {
						classes: `${bootstrap.dFlex} ${bootstrap.flexRow} ${bootstrap.borderBottom}`,
					};
					return properties;
				}
		}
	}
}
