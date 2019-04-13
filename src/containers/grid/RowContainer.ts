import GridContext from '../../context/GridContext';
import { RowProps, Row } from '../../gridWidgets/grid/widgets/row/Row';
import RuntimeContextContainer from '../../common/RuntimeContextContainer';

function getProperties(inject: GridContext, properties: RowProps): RowProps {
	const {rowIndex, key, contextName} = properties;
	const rowFields = inject.rowFields;
	const onSelect = () => {
		inject.selectRow(rowIndex);
	};
	const isSelected = rowIndex === inject.selectedRowIndex;
	return {
		rowFields,
		rowIndex,
		key,
		onSelect,
		isSelected,
		contextName
	};
}

const RowContainer: RuntimeContextContainer<Row> = RuntimeContextContainer(Row, {getProperties});

export default RowContainer;
