import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { GridData, LoadingStatusEnum } from '../../common/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import { ColumnHeaders } from './ColumnHeaders';
import { DNode, VNode } from '@dojo/framework/widget-core/interfaces';
import { NoData } from './NoData';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';
import RowContainer from '../../containers/RowContainer';
import * as lodash from 'lodash';
import GridContext from '../../context/GridContext';
import * as ownCss from './grid.m.css';

export interface GridProps extends GridData {
	context: GridContext;
	loadingStatus: LoadingStatusEnum;
}

export class Grid extends WidgetBase<GridProps> {
	private isStarted = false;

	protected render(): VNode {
		const {fields} = this.properties;
		const {rows} = this.properties;
		const gridComponents: DNode[] = [];
		if (!this.isStarted) {
			this.isStarted = true;
			this.properties.context.rowRows = this.properties.rows;
		}
		if (!lodash.isEqual(this.properties.context.rowFields, this.properties.fields)) {
			this.properties.context.rowFields = this.properties.fields;
		}
		if (!lodash.isEqual(this.properties.context.rowRows, this.properties.rows)) {
			this.properties.context.rowRows = this.properties.rows;
		}
		if (rows.rows && rows.rows.length > 0 && fields.fieldsInfo && fields.fieldsInfo.length > 0) {
			gridComponents.push(w(ColumnHeaders, {fields}));
			rows.rows.forEach((item: {}, rowIndex: number) => {
				gridComponents.push(w(RowContainer, {rowIndex, key: `row-${rowIndex}`}));
			});
		} else {
			gridComponents.push(w(NoData, {}));
		}
let classes = `${bootstrap.dFlex} ${bootstrap.flexColumn} ${bootstrap.border} `;
		if (this.properties.loadingStatus === LoadingStatusEnum.loading) {
classes += ownCss.loading;
		}
		return v('div', {
			classes,
			styles: {
				minHeight: '450px'
			}
		}, gridComponents);
	}

}
