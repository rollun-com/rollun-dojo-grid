import { Container } from '@dojo/framework/widget-core/Container';
import GridContext from '../../context/GridContext';
import { Cell, CellProps } from '../../gridWidgets/grid/widgets/Cell';
import FilterEditorAppContext from '../../context/FilterEditorAppContext';

function getValueFromGridContext(context: GridContext, rowIndex: number, columnIndex: number) {
	const rows = context.rowRows.rows;
	const row = rows[rowIndex];

	return String(row.cells[columnIndex].value);
}

function getProperties(inject: GridContext, properties: CellProps): CellProps {
	const {rowIndex, columnIndex, key} = properties;
	const value = getValueFromGridContext(inject, rowIndex, columnIndex);
	const {isEditable, minWidth} = inject.rowFields.fieldsInfo[columnIndex];
	return {
		value,
		rowIndex,
		columnIndex,
		key,
		isEditable,
		minWidth
	};
}

const CellContainer: Container<Cell> = Container(Cell, FilterEditorAppContext.GRID_CONTEXT_NAME, {getProperties});

export default CellContainer;
