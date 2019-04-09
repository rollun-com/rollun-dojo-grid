import { Container } from '@dojo/framework/widget-core/Container';
import Paginator, { PaginatorProps } from '../../gridWidgets/paginator/Paginator';
import FilterEditorAppContext from '../../context/FilterEditorAppContext';

function getProperties(inject: FilterEditorAppContext, properties: PaginatorProps): PaginatorProps {
	const currentCount = inject.datastoreData.length;
	const loadingStatus = inject.datastoreDataLoadingStatus;
	const totalCount = inject.countData;
	const pageSizeOptions = ['20', '50', '100', '200', '500', '1000', '5000', '100000'];
	return {
		loadingStatus,
		pageSizeOptions,
		currentCount,
		totalCount,
		setLimitNode: inject.setQueryLimit.bind(inject)
	};
}

const FilterEditorPaginatorContainer: Container<Paginator> = Container(Paginator, FilterEditorAppContext.APP_CONTEXT_NAME, {getProperties});

export default FilterEditorPaginatorContainer;
