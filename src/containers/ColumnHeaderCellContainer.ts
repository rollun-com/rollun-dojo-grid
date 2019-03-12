import Container from '@dojo/framework/widget-core/Container';
import GridContext from '../context/GridContext';
import { ColumnHeaderCell } from '../grid/widgets/ColumnHeaderCell';
// @ts-ignore
import Cell, { CellProps } from '../grid/widgets/Cell';
// @ts-ignore
import { DefaultWidgetBaseInterface, VNode, WidgetBaseInterface, WidgetProperties, WNode
} from '@dojo/framework/widget-core/interfaces';
// @ts-ignore
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';

function getValueFromGridContext(context: GridContext, columnIndex: number) {
	const fields = context.rowFields.fieldsInfo;
	const field = fields[columnIndex];
	return field.label || field.name;
}

function getProperties(inject: GridContext, properties: any) {
	const {rowIndex, columnIndex} = properties;
	const value = getValueFromGridContext(inject, columnIndex);
	return {
		value,
		rowIndex,
		columnIndex
	};
}

const ColumnHeaderCellContainer = Container(ColumnHeaderCell, 'gridContext', {getProperties});

export default ColumnHeaderCellContainer;
