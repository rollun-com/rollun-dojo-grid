import GridContext from '../context/GridContext';
import { Grid, GridProps } from '../grid/widgets/Grid';
// @ts-ignore
import Row, { RowProps } from '../grid/widgets/row/Row';
import MultiContextContainer from './MultiContextContainer';
import AppContextInterface, { DataItem } from '../context/AppContextInterface';
// @ts-ignore
import Cell, { CellProps } from '../grid/widgets/Cell';
// @ts-ignore
import { DefaultWidgetBaseInterface, VNode, WidgetBaseInterface, WidgetProperties, WNode }
	from '@dojo/framework/widget-core/interfaces';
// @ts-ignore
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';

function getPropertiesFromGridContext(inject: GridContext, properties: GridProps): Partial<GridProps> {
	return {
		context: inject,
	};
}

function getPropertiesFromAppContext(inject: AppContextInterface, properties: GridProps): Partial<GridProps> {
	const {datastoreData, loadingStatus, changeDataItem} = inject;
	const rowRows = {
		rows: datastoreData.map((item: DataItem, index: number) => {
				return {
					id: item.id || inject.idArray[index],
					cells: Object.values(item).map((value: string) => {
						return {
							value
						};
					})
				};
			}
		)
	};
	const rowFields = {
		fieldsInfo: datastoreData[0]
			? Object.keys(datastoreData[0]).map((key: string) => {
					return {
						name: key,
						isEditable: true,
					};
				}
			)
			: []
	};
	return {
		fields: rowFields,
		rows: rowRows,
		loadingStatus,
		changeCellValue: changeDataItem.bind(inject)
	};
}

const GridContainer = MultiContextContainer(Grid,
	{
		'gridContext': getPropertiesFromGridContext,
		'appContext': getPropertiesFromAppContext
	}
);

export default GridContainer;
