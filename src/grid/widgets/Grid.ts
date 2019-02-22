import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { ColumnInfo, DataStoreResponseDependent } from '../../common/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import ColumnHeaders from './ColumnHeaders';
import Body from './Body';
import { DNode, VNode } from '@dojo/framework/widget-core/interfaces';
import NoData from './NoData';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';

export interface GridProps extends DataStoreResponseDependent {
	columns: ColumnInfo[];

	onItemUpdate?(item: {}): void;

	editorRenderer?(column: ColumnInfo, value: string, state: {}): DNode;
}

export default class Grid extends WidgetBase<GridProps> {
	protected render(): VNode {
		const {columns, editorRenderer} = this.properties;
		const {data} = this.properties.responseInfo;
		const onItemUpdate = this.properties.onItemUpdate
			? this.properties.onItemUpdate
			: () => {
			};
		const gridComponents: DNode[] = [];
		if (data && data.length > 0 && columns && columns.length > 0) {
			gridComponents.push(w(ColumnHeaders, {columns}));
			gridComponents.push(w(Body, {columns, items: data, onItemUpdate, editorRenderer}));
		} else {
			gridComponents.push(w(NoData, {}));
		}
		return v('div', {
			classes: `${bootstrap.dFlex} ${bootstrap.flexColumn} ${bootstrap.border} `,
			styles: {
				minHeight: '450px'
			}
		}, gridComponents);
	}
}
