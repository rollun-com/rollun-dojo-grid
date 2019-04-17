import { v } from '@dojo/framework/widget-core/d';
import { Cell } from './Cell';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import * as commonCss from '../../../common/common.m.css';
export class ColumnHeaderCell extends Cell {
	protected getProcessedValue(): DNode {
		const {value} = this.properties;
		return v('td',
			{},
			[
				v('span',
					{classes: `${commonCss.headerCellFont}`},
					[value]
				),
				v('span',
					{},
					[]// TODO: sort arrow
				)
			]
		);
	}
}
