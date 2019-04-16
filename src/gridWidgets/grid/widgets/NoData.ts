import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';

export class NoData extends WidgetBase {
	protected render(): DNode {
		return v('div',
			{
				classes: `${bs.dFlex} ${bs.justifyContentCenter} ${bs.alignItemsCenter}`,
				styles: {
					minHeight: '100%',
					minWidth: '100%'
				}
			},
			[
				v('div', {classes: `${bs.dFlex}`}, [
					'No data for this request'
				])
			]
		);
	}
}
