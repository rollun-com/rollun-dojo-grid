import Container  from '@dojo/framework/widget-core/Container';
import GridContext from '../../context/GridContext';
import { ColumnHeaders, ColumnHeadersProps } from '../../gridWidgets/grid/widgets/ColumnHeaders';

function getProperties(inject: GridContext, properties: ColumnHeadersProps): ColumnHeadersProps {
	const rowFields = inject.rowFields;
	return {
		rowFields
	};
}

const ColumnHeadersContainer: Container<ColumnHeaders> = Container(ColumnHeaders, 'gridContext', {getProperties});

export default ColumnHeadersContainer;
