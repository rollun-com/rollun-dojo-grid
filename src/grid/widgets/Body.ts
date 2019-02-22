import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { ColumnInfo } from '../../common/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import Row from './row';
import { DNode } from '@dojo/framework/widget-core/interfaces';

export interface BodyProps {
	columns: ColumnInfo[];
	items: {}[];

	onItemUpdate(item: {}): void;

	editorRenderer?(column: ColumnInfo, value: string, state: {}): DNode;
}

export default class Body extends WidgetBase<BodyProps> {
	protected render(): DNode {
		const {columns, items, onItemUpdate} = this.properties;
		return v('div', {}, items.map((item: {}) => {
				return w(Row, {columns, item, onItemUpdate});
			}
		));
	}
}
