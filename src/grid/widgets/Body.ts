import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { ColumnInfo } from '../../common/interfaces';
import * as css from '../../styles/body.m.css';
import { v, w } from '@dojo/framework/widget-core/d';
import Row from './Row';
import { DNode, VNode } from '@dojo/framework/widget-core/interfaces';

export interface BodyProps {
	columns: ColumnInfo[];
	items: {}[];

	onItemUpdate(item: {}): void;

	editorRenderer?(column: ColumnInfo, value: string, state: {}): DNode;
}

export default class Body extends WidgetBase<BodyProps> {
	protected render(): VNode {
		const {columns, items, onItemUpdate} = this.properties;
		return v('div', {classes: css.body}, items.map((item: {}) => {
				return w(Row, {columns, item, onItemUpdate});
			}
		));
	}
}
