import { Container } from '@dojo/framework/widget-core/Container';
import QueryEditorInModal, { EditorModalProps } from '../../queryEditorInWrapper/QueryEditorInModal';
import Query from 'rollun-ts-rql/dist/Query';
import AppContextInterface from '../../context/AppContextInterface';


function getProperties(inject: AppContextInterface, properties: EditorModalProps): EditorModalProps {
	const query = inject.query;
	const fieldNames = Object.keys(inject.datastoreData[0]);
	return {
		query,
		fieldNames,
		applyQuery: (query: Query) => {
			inject.query = query;
			inject.reloadGridData();
		}
	};
}

const QueryEditorInModalContainer: Container<QueryEditorInModal> = Container(QueryEditorInModal, 'appContext', {getProperties});

export default QueryEditorInModalContainer;
