import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { GridData } from '../../common/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import { ColumnHeaders } from './ColumnHeaders';
import { DNode, PropertyChangeRecord, VNode } from '@dojo/framework/widget-core/interfaces';
import { NoData } from './NoData';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';
import RowContainer from '../../containers/RowContainer';
import diffProperty from '@dojo/framework/widget-core/decorators/diffProperty';
import * as lodash from 'lodash';
import GridContext from '../../context/GridContext';

export interface GridProps extends GridData {
	context: GridContext;
}

function diffData(previousProperty: string, newProperty: string): PropertyChangeRecord {
	return {
		changed: lodash.isEqual(previousProperty, newProperty),
		value: newProperty
	};
}

export class Grid extends WidgetBase<GridProps> {
	private isStarted = false;

	@diffProperty('fields', diffData)
	@diffProperty('rows', diffData)
	protected render(): VNode {
		if (!this.isStarted) {
			this.isStarted = true;
			this.properties.context.rowRows = this.properties.rows;
		}
		const {fields} = this.properties;
		const {rows} = this.properties.rows;
		const gridComponents: DNode[] = [];
		if (rows && rows.length > 0 && fields.fieldsInfo && fields.fieldsInfo.length > 0) {
			gridComponents.push(w(ColumnHeaders, {fields}));
			rows.forEach((item: {}, rowIndex: number) => {
				gridComponents.push(w(RowContainer, {rowIndex}));
			});
		} else {
			gridComponents.push(w(NoData, {}));
		}
		return v('div', {
			classes: `${bootstrap.dFlex} ${bootstrap.flexColumn} ${bootstrap.border} `,
			styles: {
				minHeight: '450px'
			}
		}, gridComponents);
	}
}
