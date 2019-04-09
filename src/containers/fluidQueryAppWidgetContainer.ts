import Container from '@dojo/framework/widget-core/Container';
import QueryAppContext from '../context/QueryAppContext';
import FluidQueryAppWidget, { FluidQueryAppWidgetProps } from '../queryAppWidget/FluidQueryAppWidget';

function getProperties(inject: QueryAppContext, properties: Partial<FluidQueryAppWidgetProps>): FluidQueryAppWidgetProps {
	const isEditingFilters = inject.isEditingFilters;
	const setEditingFilters = (value: boolean) => {
		inject.isEditingFilters = value;
	};
	return {
		isEditingFilters,
		setEditingFilters
	};
}

const FluidQueryAppWidgetContainer: Container<FluidQueryAppWidget> = Container(FluidQueryAppWidget, 'queryAppContext', {getProperties});

export default FluidQueryAppWidgetContainer;
