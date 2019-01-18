import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import * as css from '../../styles/noData.m.css';

export default class NoData extends WidgetBase {
	protected render(): DNode {
		return v('div',
			{
				classes: css.root
			},
			[
				v('div', {classes: css.labelContainer}, [
					v('div', {classes: css.label}, [
						'No data for this request'
					])
				])
			]
		);
	}
}
