import Container from '@dojo/framework/widget-core/Container';
import GridContext from '../../context/GridContext';
import { RowProps, Row } from '../../gridWidgets/grid/widgets/row/Row';

function getProperties(inject: GridContext, properties: RowProps): RowProps {
	const {rowIndex, key} = properties;
	const rowFields = inject.rowFields;
	return {
		rowFields,
		rowIndex,
		key
	};
}

const RowContainer: Container<Row> = Container(Row, 'gridContext', {getProperties});

export default RowContainer;
