import { v } from '@dojo/framework/widget-core/d';
import { Cell } from './Cell';
import { DNode } from '@dojo/framework/widget-core/interfaces';

export class ColumnHeaderCell extends Cell {
	protected getValue(): DNode {
		const {value} = this.properties;
		return v('td',
			{},
			[
				v('span',
					{},
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
