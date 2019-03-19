import AppContextInterface from '../../context/AppContextInterface';
import MultiContextContainer from '../MultiContextContainer';
import QueryEditorContext from '../../context/QueryEditorContext';
import Query from 'rollun-ts-rql/dist/Query';
import QueryEditorContainerModal, { QueryEditorContainerModalProps } from '../../queryEditorInWrapper/QueryEditorContainerModal';

function getPropertiesFromAppContext(inject: AppContextInterface, properties: Partial<QueryEditorContainerModalProps>): Partial<QueryEditorContainerModalProps> {

	return {
		applyQuery: (query: Query) => {
			inject.query = query;
			inject.reloadGridData();
		}
	};
}

function getPropertiesFromQueryEditorContext(inject: QueryEditorContext, properties: Partial<QueryEditorContainerModalProps>): Partial<QueryEditorContainerModalProps> {
	return {
		context: inject
	};
}

const QueryEditorContainer: MultiContextContainer<QueryEditorContainerModal> = MultiContextContainer(QueryEditorContainerModal, {
	'appContext': getPropertiesFromAppContext,
	'queryEditorContext': getPropertiesFromQueryEditorContext,
});

export default QueryEditorContainer;
