import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import RGrid, { ColumnInfo, DataStoreResponseDependent } from '../../common/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import ColumnHeaders from './ColumnHeaders';
import { DNode, PropertyChangeRecord, VNode } from '@dojo/framework/widget-core/interfaces';
import NoData from './NoData';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';
import RowContainer from '../../containers/RowContainer';
import diffProperty from '@dojo/framework/widget-core/decorators/diffProperty';
import * as lodash from 'lodash';
import RGrid from '../../context/GridContext';

namespace RGrid.Widgets.Grid {
	import GridData = RGrid.Interfaces.GridData;
	import GridContext = RGrid.GridContext;

	export interface GridProps extends GridData {
		context: RGrid.GridContext;
	}

	function diffData(previousProperty: string, newProperty: string): PropertyChangeRecord {
		return {
			changed: lodash.isEqual(previousProperty, newProperty),
			value: newProperty
		};
	}

	export default class Grid extends WidgetBase<GridProps> {
		private isStarted = false;

		@diffProperty('values', diffData)
		protected render(): VNode {
			if (!this.isStarted) {
				this.isStarted = true;
				this.properties.context.values = this.properties.responseInfo.data;
			}
			const {columns, /*editorRenderer*/} = this.properties;
			const {data} = this.properties.responseInfo;
			const gridComponents: DNode[] = [];
			if (data && data.length > 0 && columns && columns.length > 0) {
				gridComponents.push(w(ColumnHeaders, {columns}));
				data.forEach((item: {}, rowIndex: number) => {
					gridComponents.push(w(RowContainer, {rowIndex}));
					console.log('row w() ', rowIndex);
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
}
