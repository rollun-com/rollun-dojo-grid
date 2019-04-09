import { Container } from '@dojo/framework/widget-core/Container';
import FilterEditorAppWidget, { FilterEditorAppWidgetProps } from '../../queryAppWidget/FilterEditorAppWidget';
import QueryAppContext from '../../context/QueryAppContext';

function getProperties(inject: QueryAppContext, properties: FilterEditorAppWidgetProps): FilterEditorAppWidgetProps {
	const onApplySelectedQuery = inject.applyQueryFromFilterEditor.bind(inject);
	return {
		onApplySelectedQuery,
	};
}

const FilterEditorAppWidgetContainer: Container<FilterEditorAppWidget> = Container(FilterEditorAppWidget, 'queryAppContext', {getProperties});

export default FilterEditorAppWidgetContainer;
