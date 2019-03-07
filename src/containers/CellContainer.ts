import { Container }  from '@dojo/framework/widget-core/Container';
import GridContext from '../context/GridContext';
// @ts-ignore
import Cell, { CellProps } from '../grid/widgets/Cell';
// @ts-ignore
import { DefaultWidgetBaseInterface, VNode, WidgetBaseInterface, WidgetProperties, WNode }
from '@dojo/framework/widget-core/interfaces';
// @ts-ignore
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';

function getProperties(inject: GridContext, properties: any) {
	const {rowIndex, columnIndex} = properties;
	const column = inject.columns[columnIndex];
	const content = inject.values[rowIndex][columnIndex];
	console.log(`cell # ${rowIndex} ${columnIndex} props from container`, content, column);
	return {
		content,
		columnInfo: column,
		rowIndex,
		columnIndex
	};
}

const CellContainer = Container(Cell, 'gridContext', {getProperties});

export default CellContainer;
