import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import * as css from './nodeFieldName.m.css';
import { VNode } from '@dojo/framework/widget-core/interfaces';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';
import AggregateFunctionNode from 'rollun-ts-rql/dist/nodes/aggregateNodes/AggregateFunctionNode';

export interface SelectFieldProps {
	fieldName: (string | AggregateFunctionNode);
	isActive?: boolean;
	nodeType?: string;
}

export default class NodeFieldName extends WidgetBase<SelectFieldProps> {
	render(): VNode {
		let classes = `${bs.py1} ${bs.px2} ${bs.mb1} ${css.root} `;
		if (this.properties.isActive) {
			classes += ` ${css.active}`;
		}
		return v('div', {
				draggable: true,
				ondragstart: (event: DragEvent) => {
					this.handleDragStart(event);
				},
				classes
			},
			[`${this.properties.fieldName}`]);
	}

	private handleDragStart(event: DragEvent) {
		const nodeFieldName = this.properties.fieldName instanceof AggregateFunctionNode
			? `${this.properties.fieldName.function}(${this.properties.fieldName.field})`
			: this.properties.fieldName;
		event.dataTransfer.setData('nodefieldname', nodeFieldName);
		if (this.properties.nodeType) {
			event.dataTransfer.setData(this.properties.nodeType, '');
		}
	}
}
