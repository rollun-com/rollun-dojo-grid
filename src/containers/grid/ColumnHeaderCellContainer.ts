import Container from '@dojo/framework/widget-core/Container';
import GridContext from '../../context/GridContext';
import { ColumnHeaderCell } from '../../gridWidgets/grid/widgets/ColumnHeaderCell';
import { CellProps } from '../../gridWidgets/grid/widgets/Cell';

function getValueFromGridContext(context: GridContext, columnIndex: number) {
	const fields = context.rowFields.fieldsInfo;
	const field = fields[columnIndex];
	return field.label || field.name;
}

function getProperties(inject: GridContext, properties: CellProps) {
	const {rowIndex, columnIndex} = properties;
	const value = getValueFromGridContext(inject, columnIndex);
	return {
		value,
		rowIndex,
		columnIndex
	};
}

const ColumnHeaderCellContainer: Container<ColumnHeaderCell> = Container(ColumnHeaderCell, 'gridContext', {getProperties});

export default ColumnHeaderCellContainer;
