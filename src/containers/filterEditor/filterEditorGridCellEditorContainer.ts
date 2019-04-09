import { Container } from '@dojo/framework/widget-core/Container';
import GridContext from '../../context/GridContext';
import CellEditor, { CellEditorProps } from '../../gridWidgets/grid/widgets/editors/CellEditor';

function getValueFromGridContext(context: GridContext, rowIndex: number, columnIndex: number) {
	const rows = context.rowRows.rows;
	const row = rows[rowIndex];

	return String(row.cells[columnIndex].value);
}

function getProperties(inject: GridContext, properties: CellEditorProps): CellEditorProps {
	const {rowIndex, columnIndex, key} = properties;
	const value = getValueFromGridContext(inject, rowIndex, columnIndex);
	const onCellValueUpdate = inject.changeCellValue.bind(inject);
	const {onStopEditing} = properties;
	return {
		value,
		rowIndex,
		columnIndex,
		key,
		onCellValueUpdate,
		onStopEditing
	};
}

const CellEditorContainer: Container<CellEditor> = Container(CellEditor, 'gridContext', {getProperties});

export default CellEditorContainer;
