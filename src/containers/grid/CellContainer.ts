import { Container } from '@dojo/framework/widget-core/Container';
import GridContext from '../../context/GridContext';
import { Cell, CellProps } from '../../gridWidgets/grid/widgets/Cell';

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

const CellContainer: Container<Cell> = Container(Cell, 'gridContext', {getProperties});

export default CellContainer;
