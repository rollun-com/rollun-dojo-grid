import QueryAppContextInterface from '../../context/QueryAppContextInterface';
import QueryEditorContext from '../../context/QueryEditorContext';
import Query from 'rollun-ts-rql/dist/Query';
import QueryEditorContainerModal, { QueryEditorContainerModalProps } from '../../queryEditorInWrapper/QueryEditorContainerModal';
import MultiContextContainer from '../../common/MultiContextContainer';
import { QueryAppDialogNames } from '../../context/QueryAppContext';

function getPropertiesFromAppContext(inject: QueryAppContextInterface, properties: Partial<QueryEditorContainerModalProps>): Partial<QueryEditorContainerModalProps> {
	const isOpen = inject.dialogs.get(QueryAppDialogNames.editQueryDialog).shown;
	const openDialog = () => {inject.dialogs.show(QueryAppDialogNames.editQueryDialog); };
	const closeDialog = () => {inject.dialogs.hide(QueryAppDialogNames.editQueryDialog); };
	return {
		isOpen,
		openDialog,
		closeDialog,
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
	'queryAppContext': getPropertiesFromAppContext,
	'queryEditorContext': getPropertiesFromQueryEditorContext,
});

export default QueryEditorContainerModalContainer;
