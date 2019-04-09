import Container from '@dojo/framework/widget-core/Container';
import GridContext from '../../context/GridContext';
import { RowProps, Row } from '../../gridWidgets/grid/widgets/row/Row';
import FilterEditorAppContext from '../../context/FilterEditorAppContext';

function getProperties(inject: GridContext, properties: RowProps): RowProps {
	const {rowIndex, key} = properties;
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
		isSelected
	};
}

const RowContainer: Container<Row> = Container(Row, FilterEditorAppContext.GRID_CONTEXT_NAME, {getProperties});

export default RowContainer;
