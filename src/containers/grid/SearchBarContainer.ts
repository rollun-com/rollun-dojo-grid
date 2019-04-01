import { Container } from '@dojo/framework/widget-core/Container';
import QueryAppContextInterface from '../../context/QueryAppContextInterface';
import SearchBar, { SearchBarProps } from '../../gridWidgets/searchBar/SearchBar';

function getProperties(inject: QueryAppContextInterface, properties: SearchBarProps): SearchBarProps {
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

const SearchBarContainer: Container<SearchBar> = Container(SearchBar, 'queryAppContext', {getProperties});

export default SearchBarContainer;
