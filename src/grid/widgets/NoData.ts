import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';

export default class NoData extends WidgetBase {
	protected render(): DNode {
		return v('div',
			{classes: 'd-flex flex-grow-1 justify-content-center align-items-center'},
			[
				v('div', {classes: ''}, [
					'No data for this request'
				])
			]
		);
	}
}
