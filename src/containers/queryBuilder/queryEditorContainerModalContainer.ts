import AppContextInterface from '../../context/AppContextInterface';
import MultiContextContainer from '../MultiContextContainer';
import QueryEditorContext from '../../context/QueryEditorContext';
import Query from 'rollun-ts-rql/dist/Query';
import QueryEditorContainerModal, { QueryEditorContainerModalProps } from '../../queryEditorInWrapper/QueryEditorContainerModal';
import { FieldInfo } from '../../common/interfaces';

function getPropertiesFromAppContext(inject: AppContextInterface, properties: Partial<QueryEditorContainerModalProps>): Partial<QueryEditorContainerModalProps> {

	return {
		query: inject.query,
		applyQuery: (query: Query) => {
			inject.query = query;
			inject.reloadGridData();
		},
		fieldNames: inject.fieldsConfig.map((item: FieldInfo) => {
			return item.name;
		})
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
