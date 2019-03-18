import { Container } from '@dojo/framework/widget-core/Container';
// @ts-ignore
import { DefaultWidgetBaseInterface, VNode, WidgetBaseInterface, WidgetProperties, WNode }
	from '@dojo/framework/widget-core/interfaces';
// @ts-ignore
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import GridContext from '../context/GridContext';
import { Cell, CellProps } from '../grid/widgets/Cell';

function getValueFromGridContext(context: GridContext, rowIndex: number, columnIndex: number) {
	const rows = context.rowRows.rows;
	const row = rows[rowIndex];

	return String(row.cells[columnIndex].value);
}

function getProperties(inject: GridContext, properties: CellProps): CellProps {
	const {rowIndex, columnIndex, key} = properties;
	const value = getValueFromGridContext(inject, rowIndex, columnIndex);
	const {isEditable, width} = inject.rowFields.fieldsInfo[columnIndex];
	return {
		value,
		rowIndex,
		columnIndex,
		key,
		isEditable,
		width
	};
}

const CellContainer = Container(Cell, 'gridContext', {getProperties});

export default CellContainer;
