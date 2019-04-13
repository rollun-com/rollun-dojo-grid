import GridContext from '../../context/GridContext';
import { ColumnHeaders, ColumnHeadersProps } from '../../gridWidgets/grid/widgets/ColumnHeaders';
import RuntimeContextContainer from '../../common/RuntimeContextContainer';

function getProperties(inject: GridContext, properties: ColumnHeadersProps): ColumnHeadersProps {
	const rowFields = inject.rowFields;
	const {contextName} = properties;
	return {
		rowFields,
		contextName
	};
}

const ColumnHeadersContainer: RuntimeContextContainer<ColumnHeaders> = RuntimeContextContainer(ColumnHeaders, {getProperties});

export default ColumnHeadersContainer;
