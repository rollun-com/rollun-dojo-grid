import { v } from '@dojo/framework/widget-core/d';
import Cell from './Cell';
import { DNode } from '@dojo/framework/widget-core/interfaces';

namespace RGrid.Widgets.Grid.Header {

	export class ColumnHeaderCell extends Cell {
		protected getContent(): DNode {
			const {content} = this.properties;
			return v('div',
				{},
				[
					v('span',
						{},
						[content]
					),
					v('span',
						{},
						[]// TODO: sort arrow
					)
				]
			);
		}
	}
}
