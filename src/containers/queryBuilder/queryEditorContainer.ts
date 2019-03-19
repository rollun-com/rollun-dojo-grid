import AppContextInterface from '../../context/AppContextInterface';
import MultiContextContainer from '../MultiContextContainer';
import QueryEditorContext from '../../context/QueryEditorContext';
import QueryEditor, { QueryEditorProps } from '../../queryEditor/queryEditor/QueryEditor';


function getPropertiesFromAppContext(inject: AppContextInterface, properties: Partial<QueryEditorProps>): Partial<QueryEditorProps> {
	const {query} = inject;
	const fieldNames = (inject.datastoreData.length > 0)
		? Object.keys(inject.datastoreData[0])
		: [];
	return {
		query,
		fieldNames
	};
}

function getPropertiesFromQueryEditorContext(inject: QueryEditorContext, properties: Partial<QueryEditorProps>): Partial<QueryEditorProps> {
	return {
		context: inject
	};
}

const QueryEditorContainer: MultiContextContainer<QueryEditor> = MultiContextContainer(QueryEditor, {
	'appContext': getPropertiesFromAppContext,
	'queryEditorContext': getPropertiesFromQueryEditorContext,
});

export default QueryEditorContainer;
