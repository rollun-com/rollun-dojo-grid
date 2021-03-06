import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { GridData, LoadingStatusEnum } from '../../../common/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import { ColumnHeaders } from './ColumnHeaders';
import { DNode, VNode } from '@dojo/framework/widget-core/interfaces';
import { NoData } from './NoData';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';
import RowContainer from '../../../containers/grid/RowContainer';
import * as lodash from 'lodash';
import GridContext from '../../../context/GridContext';
import * as ownCss from './grid.m.css';
import ContextConfig from '../../../common/ContextConfig';

export interface GridProps extends GridData {
	context: GridContext;
	loadingStatus?: LoadingStatusEnum;
	changeCellValue?: (rowIndex: number, columnIndex: number, value: string) => void;
}

export class Grid extends WidgetBase<GridProps> {

	static contextConfig = new ContextConfig(GridContext, []);

	private isStarted = false;

	protected render(): VNode {
		const {fields, rows} = this.properties;

		if (!this.isStarted) {
			this.isStarted = true;
			this.properties.context.rowRows = this.properties.rows;
			this.properties.context.changeCellValue = this.properties.changeCellValue;
		}
		if (!lodash.isEqual(this.properties.context.rowFields, this.properties.fields)) {// ensure consistency between app data and grid data
			this.properties.context.rowFields = this.properties.fields;
		}
		if (!lodash.isEqual(this.properties.context.rowRows, this.properties.rows)) {// ensure consistency between app data and grid data
			this.properties.context.rowRows = this.properties.rows;
		}
		const isDataLoaded = rows.rows && rows.rows.length > 0 && fields.fieldsInfo && fields.fieldsInfo.length > 0;
		return v('div',
			{
				classes: `${bs.dFlex} ${bs.mw100} ${bs.border}`,
				styles: {
					minWidth: '500px',
					minHeight: '250px',
					overflow: 'auto hidden'
				}
			},
			isDataLoaded
				? [this.renderGrid()]
				: [this.renderNoDataBanner()]
		);
	}

	protected renderGrid(): DNode {
		const {rows, fields, loadingStatus} = this.properties;
		const contextName = this.properties.context.name;
		const gridComponents: DNode[] = [w(ColumnHeaders, {contextName, rowFields: fields})];
		rows.rows.forEach((item: {}, rowIndex: number) => {
			gridComponents.push(
				w(RowContainer, {
					contextName,
					rowIndex,
					key: `row-${rowIndex}-${Math.ceil(Math.random() * 1000)}`
				}));
		});
		let classes = ` `;
		if (loadingStatus === LoadingStatusEnum.loading) {
			classes += ownCss.loading;
		}
		return v('table',
			{
				classes,
			},
			gridComponents);
	}

	protected renderNoDataBanner(): DNode {
		return w(NoData, {});
	}
}
