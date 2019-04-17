import GridContext from '../../context/GridContext';
import RuntimeContextContainer from '../../common/RuntimeContextContainer';
import { CellEditorProps } from '../../gridWidgets/grid/widgets/editors/CellEditor';
import CalendarEditor from '../../gridWidgets/grid/widgets/editors/CalendarEditor';

function getValueFromGridContext(context: GridContext, rowIndex: number, columnIndex: number) {
	const rows = context.rowRows.rows;
	const row = rows[rowIndex];

	return String(row.cells[columnIndex].value);
}

function getProperties(inject: GridContext, properties: Partial<CellEditorProps>): CellEditorProps {
	const {rowIndex, columnIndex, key, contextName} = properties;
	const value = getValueFromGridContext(inject, rowIndex, columnIndex);
	const onCellValueUpdate = inject.changeCellValue.bind(inject);
	const {onStopEditing} = properties;
	return {
		value,
		rowIndex,
		columnIndex,
		key,
		onCellValueUpdate,
		onStopEditing,
		contextName
	};
}

const CalendarEditorContainer: RuntimeContextContainer<CalendarEditor> = RuntimeContextContainer(CalendarEditor, {getProperties});

export default CalendarEditorContainer;
