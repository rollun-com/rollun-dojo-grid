import QueryAppContextInterface from '../../context/QueryAppContextInterface';
import MultiContextContainer from '../MultiContextContainer';
import QueryEditorContext from '../../context/QueryEditorContext';
import Query from 'rollun-ts-rql/dist/Query';
import QueryEditorContainerModal, { QueryEditorContainerModalProps } from '../../queryEditorInWrapper/QueryEditorContainerModal';

function getPropertiesFromAppContext(inject: QueryAppContextInterface, properties: Partial<QueryEditorContainerModalProps>): Partial<QueryEditorContainerModalProps> {

	return {
		query: inject.query,
		applyQuery: (query: Query) => {
			inject.query = query;
			inject.reloadGridData();
		},
		fieldNames: inject.datastoreData[0]
			? Object.keys(inject.datastoreData[0])
			: []
	};
}

function getPropertiesFromQueryEditorContext(inject: QueryEditorContext, properties: Partial<QueryEditorContainerModalProps>): Partial<QueryEditorContainerModalProps> {
	return {
		context: inject
	};
}

const QueryEditorContainerModalContainer: MultiContextContainer<QueryEditorContainerModal> = MultiContextContainer(QueryEditorContainerModal, {
	'appContext': getPropertiesFromAppContext,
	'queryEditorContext': getPropertiesFromQueryEditorContext,
});

export default QueryEditorContainerModalContainer;
