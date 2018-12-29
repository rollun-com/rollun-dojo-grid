import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { Column } from './interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import ColumnHeaders from './ColumnHeaders';
import * as css from '../../styles/grid.m.css';
import Body from './Body';
import { DNode, VNode } from '@dojo/framework/widget-core/interfaces';

export interface GridProps {
	columns: Column[];
	items: {}[];

	onItemUpdate?(item: {}): void;

	editorRenderer?(column: Column, value: string, state: {}): DNode;
}

export default class Grid extends WidgetBase<GridProps> {
	protected render(): VNode {
		const {columns, items, editorRenderer} = this.properties;
		const onItemUpdate = this.properties.onItemUpdate
			? this.properties.onItemUpdate
			: () => {};
		return v('div', {classes: css.grid}, [
			w(ColumnHeaders, {columns}),
			w(Body, {columns, items, onItemUpdate, editorRenderer})
		]);
	}
}
