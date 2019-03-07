import Container from '@dojo/framework/widget-core/Container';
import GridContext from '../context/GridContext';
// @ts-ignore
import Row, { RowProps } from '../grid/widgets/row/Row';
// @ts-ignore
import Cell, { CellProps } from '../grid/widgets/Cell';
// @ts-ignore
import { DefaultWidgetBaseInterface, VNode, WidgetBaseInterface, WidgetProperties, WNode
} from '@dojo/framework/widget-core/interfaces';
// @ts-ignore
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';

function getProperties(inject: GridContext, properties: any) {
	const {rowIndex} = properties;
	const columns = inject.columns;
	console.log('row index, columns from container', rowIndex, columns);
	return {
		columns,
		rowIndex
	};
}

const RowContainer = Container(Row, 'gridContext', {getProperties});

export default RowContainer;
