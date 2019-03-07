import Container  from '@dojo/framework/widget-core/Container';
import GridContext from '../context/GridContext';
import ColumnHeaderCell from '../grid/widgets/ColumnHeaderCell';
// @ts-ignore
import Cell, { CellProps } from '../grid/widgets/Cell';
// @ts-ignore
import { DefaultWidgetBaseInterface, VNode, WidgetBaseInterface, WidgetProperties, WNode
} from '@dojo/framework/widget-core/interfaces';
// @ts-ignore
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';

function getProperties(inject: GridContext, properties: any) {
	const {rowIndex, columnIndex} = properties;
	const column = inject.columns[columnIndex];
	const content = Object.keys(inject.values[0])[columnIndex];
	return {
		content,
		columnInfo: column,
		rowIndex,
		columnIndex
	};
}

const ColumnHeaderCellContainer = Container(ColumnHeaderCell, 'gridContext', {getProperties});

export default ColumnHeaderCellContainer;
