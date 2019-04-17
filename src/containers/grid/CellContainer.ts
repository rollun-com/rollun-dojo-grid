import GridContext from '../../context/GridContext';
import { Cell, CellProps } from '../../gridWidgets/grid/widgets/Cell';
import RuntimeContextContainer from '../../common/RuntimeContextContainer';

function getValueFromGridContext(context: GridContext, rowIndex: number, columnIndex: number) {
	const rows = context.rowRows.rows;
	const row = rows[rowIndex];

	return String(row.cells[columnIndex].value);
}

function getProperties(inject: GridContext, properties: CellProps): CellProps {
	const {rowIndex, columnIndex, key, contextName, isSelected} = properties;
	const value = getValueFromGridContext(inject, rowIndex, columnIndex);
	const {isEditable, minWidth, renderer, editor} = inject.rowFields.fieldsInfo[columnIndex];
	return {
		value,
		rowIndex,
		columnIndex,
		key,
		isEditable,
		minWidth,
		contextName,
		renderer,
		isSelected,
		editor
	};
}

const CellContainer: RuntimeContextContainer<Cell> = RuntimeContextContainer(Cell, {getProperties});

export default CellContainer;
