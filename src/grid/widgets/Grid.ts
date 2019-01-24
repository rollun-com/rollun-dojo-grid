import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { ColumnInfo } from '../../common/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import ColumnHeaders from './ColumnHeaders';
import * as css from '../../styles/grid.m.css';
import Body from './Body';
import { DNode, VNode } from '@dojo/framework/widget-core/interfaces';
import NoData from './NoData';

export interface GridProps {
	columns: ColumnInfo[];
	items: {}[];

	onItemUpdate?(item: {}): void;

	editorRenderer?(column: ColumnInfo, value: string, state: {}): DNode;
}

export default class Grid extends WidgetBase<GridProps> {
	protected render(): VNode {
		const {columns, items, editorRenderer} = this.properties;
		const onItemUpdate = this.properties.onItemUpdate
			? this.properties.onItemUpdate
			: () => {
			};
		const gridComponents: DNode[] = [
			w(ColumnHeaders, {columns})
		];
		if (items && items.length > 0) {
			gridComponents.push(w(Body, {columns, items, onItemUpdate, editorRenderer}));
		} else {
			gridComponents.push(w(NoData, {}));
		}
		return v('div', {classes: css.grid}, gridComponents);
	}
}
