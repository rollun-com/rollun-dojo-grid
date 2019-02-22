import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';

export default class NoData extends WidgetBase {
	protected render(): DNode {
		return v('div',
			{classes: `${bootstrap.dFlex} ${bootstrap.flexGrow1} ${bootstrap.justifyContentCenter} ${bootstrap.alignItemsCenter}`},
			[
				v('div', {classes: ''}, [
					'No data for this request'
				])
			]
		);
	}
}
