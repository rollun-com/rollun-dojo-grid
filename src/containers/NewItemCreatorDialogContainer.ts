import Container from '@dojo/framework/widget-core/Container';
import QueryAppContext from '../context/QueryAppContext';
import NewItemCreatorDialog, { NewItemCreatorDialogProps } from '../dialog/NewItemCreatorDialog';

function getProperties(inject: QueryAppContext, properties: Partial<NewItemCreatorDialogProps>): NewItemCreatorDialogProps {
	const formConfig = inject.datastoreData[0]
		? Object.keys(inject.datastoreData[0]).map(fieldName => {
			return {field: fieldName};
		})
		: [];
	return {
		formConfig,
		onFormSubmit: inject.addNewItem.bind(inject)
	};
}

const NewItemCreatorDialogContainer: Container<NewItemCreatorDialog> = Container(NewItemCreatorDialog, 'queryAppContext', {getProperties});

export default NewItemCreatorDialogContainer;
