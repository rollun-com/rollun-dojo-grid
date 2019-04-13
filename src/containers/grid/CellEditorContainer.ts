import GridContext from '../../context/GridContext';
import CellEditor, { CellEditorProps } from '../../gridWidgets/grid/widgets/editors/CellEditor';
import RuntimeContextContainer from '../../common/RuntimeContextContainer';

function getValueFromGridContext(context: GridContext, rowIndex: number, columnIndex: number) {
	const rows = context.rowRows.rows;
	const row = rows[rowIndex];

	return String(row.cells[columnIndex].value);
}

function getProperties(inject: GridContext, properties: CellEditorProps): CellEditorProps {
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

const CellEditorContainer: RuntimeContextContainer<CellEditor> = RuntimeContextContainer(CellEditor, {getProperties});

export default CellEditorContainer;
