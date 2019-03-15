import { Container } from '@dojo/framework/widget-core/Container';
// @ts-ignore
import { DefaultWidgetBaseInterface, VNode, WidgetBaseInterface, WidgetProperties, WNode }
	from '@dojo/framework/widget-core/interfaces';
// @ts-ignore
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import GridContext from '../context/GridContext';
import CellEditor, { CellEditorProps } from '../grid/widgets/editors/CellEditor';

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

const CellEditorContainer = Container(CellEditor, 'gridContext', {getProperties});

export default CellEditorContainer;
