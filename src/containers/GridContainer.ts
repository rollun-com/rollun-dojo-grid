import GridContext from '../context/GridContext';
// @ts-ignore
import { Grid, GridProps } from '../grid/widgets/Grid';
// @ts-ignore
import Row, { RowProps } from '../grid/widgets/row/Row';
import MultiContextContainer from './MultiContextContainer';
import AppContext, { DataItem } from '../context/AppContext';
// @ts-ignore
import Cell, { CellProps } from '../grid/widgets/Cell';
// @ts-ignore
import { DefaultWidgetBaseInterface, VNode, WidgetBaseInterface, WidgetProperties, WNode
} from '@dojo/framework/widget-core/interfaces';
// @ts-ignore
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';

function getPropertiesFromGridContext(inject: GridContext, properties: GridProps): Partial<GridProps> {
	return {
		context: inject,
	};
}

function getPropertiesFromAppContext(inject: AppContext, properties: GridProps): Partial<GridProps> {
	let rowFields, rowRows;
	const data = inject.dataFromServer;
	rowRows = {
		rows: data.map((item: DataItem) => {
				return {
					id: item.id,
					cells: Object.values(item).map((value: string) => {
						return {
							value
						};
					})
				};
			}
		)
	};
	rowFields = {
		fieldsInfo: data[0]
			? Object.keys(data[0]).map((key: string) => {
					return {
						name: key
					};
				}
			)
			: []
	};
	return {
		fields: rowFields,
		rows: rowRows
	};
}

const GridContainer = MultiContextContainer(Grid,
	{
		'gridContext': getPropertiesFromGridContext,
		'appContext': getPropertiesFromAppContext
	}
);

export default GridContainer;
