import GridContext from '../context/GridContext';
// @ts-ignore
import Grid, { GridProps } from '../grid/widgets/Grid';
// @ts-ignore
import Row, { RowProps } from '../grid/widgets/row/Row';
import MultiContextContainer from './MultiContextContainer';
import AppContext from '../context/AppContext';
// @ts-ignore
import Cell, { CellProps } from '../grid/widgets/Cell';
// @ts-ignore
import { DefaultWidgetBaseInterface, VNode, WidgetBaseInterface, WidgetProperties, WNode
} from '@dojo/framework/widget-core/interfaces';
// @ts-ignore
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';

function getPropertiesFromGridContext(inject: GridContext, properties: any) {
	const {columns} = inject;
	return {
		context: inject,
		columns
	};
}

function getPropertiesFromAppContext(inject: AppContext, properties: any) {
	const values = inject.gridValues;
	return {
		responseInfo: {
			data: values
		}
	};
}

const GridContainer = MultiContextContainer(Grid,
	{
		'gridContext': getPropertiesFromGridContext,
		'appContext': getPropertiesFromAppContext
	}
);

export default GridContainer;
