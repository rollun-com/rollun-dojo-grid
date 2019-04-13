import GridContext from '../../context/GridContext';
import { ColumnHeaderCell } from '../../gridWidgets/grid/widgets/ColumnHeaderCell';
import { CellProps } from '../../gridWidgets/grid/widgets/Cell';
import RuntimeContextContainer from '../../common/RuntimeContextContainer';

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

const ColumnHeaderCellContainer: RuntimeContextContainer<ColumnHeaderCell> = RuntimeContextContainer(ColumnHeaderCell, {getProperties});

export default ColumnHeaderCellContainer;
