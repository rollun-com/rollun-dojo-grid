import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { Column } from './interfaces';
import * as css from '../../styles/body.m.css';
import { v, w } from '@dojo/framework/widget-core/d';
import Row from './Row';
import { VNode } from '@dojo/framework/widget-core/interfaces';

export interface BodyProps {
	columns: Column[];
	items: {}[];
}

export default class Body extends WidgetBase<BodyProps> {
	protected render(): VNode {
		const {columns, items} = this.properties;
		return v('div', {classes: css.body}, items.map((item: {}) => {
				return w(Row, {columns, item});
			}
		));
	}
}
