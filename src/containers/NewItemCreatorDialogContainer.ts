import Container from '@dojo/framework/widget-core/Container';
import QueryAppContext from '../context/QueryAppContext';
import NewItemCreatorDialog, { NewItemCreatorProps } from '../dialog/NewItemCreatorDialog';

function getProperties(inject: QueryAppContext, properties: Partial<NewItemCreatorProps>): NewItemCreatorProps {
	const fieldNames = inject.datastoreData[0]
		? Object.keys(inject.datastoreData[0])
		: [];
	return {
		fieldNames,
		onFormSubmit: inject.addNewItem.bind(inject)
	};
}

const NewItemCreatorDialogContainer: Container<NewItemCreatorDialog> = Container(NewItemCreatorDialog, 'queryAppContext', {getProperties});

export default NewItemCreatorDialogContainer;
