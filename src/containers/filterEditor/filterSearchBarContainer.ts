import { Container } from '@dojo/framework/widget-core/Container';
import SearchBar, { SearchBarProps } from '../../gridWidgets/searchBar/SearchBar';
import FilterEditorAppContext from '../../context/FilterEditorAppContext';

function getProperties(inject: FilterEditorAppContext, properties: SearchBarProps): SearchBarProps {
	const loadingStatus = inject.datastoreDataLoadingStatus;
	const rowFields = {
		fieldsInfo: inject.datastoreData[0]
			? Object.keys(inject.datastoreData[0]).map((key: string) => {
					return {
						name: key
					};
				}
			)
			: []
	};

	return {
		rowFields,
		loadingStatus,
		setFilterNode: inject.setQueryQuery.bind(inject),
		cancelSearch: inject.removeQueryQuery.bind(inject)
	};
}

const FilterEditorSearchBarContainer: Container<SearchBar> = Container(SearchBar, FilterEditorAppContext.APP_CONTEXT_NAME, {getProperties});

export default FilterEditorSearchBarContainer;
