import Container from '@dojo/framework/widget-core/Container';
import QueryAppContext, { QueryAppDialogNames } from '../context/QueryAppContext';
import NewItemCreatorDialog, { NewItemCreatorDialogProps } from '../dialog/NewItemCreatorDialog';

function getProperties(inject: QueryAppContext, properties: Partial<NewItemCreatorDialogProps>): NewItemCreatorDialogProps {
	const formConfig = inject.datastoreData[0]
		? Object.keys(inject.datastoreData[0]).map(fieldName => {
			return {field: fieldName};
		})
		: [];
	const isOpen = inject.dialogs.get(QueryAppDialogNames.addNewItemDialog).shown;
	const openDialog = () => {inject.dialogs.show(QueryAppDialogNames.addNewItemDialog); };
	const closeDialog = () => {inject.dialogs.hide(QueryAppDialogNames.addNewItemDialog); };
	return {
		formConfig,
		onFormSubmit: inject.addNewItem.bind(inject),
		isOpen,
		openDialog,
		closeDialog
	};
}

const NewItemCreatorDialogContainer: Container<NewItemCreatorDialog> = Container(NewItemCreatorDialog, 'queryAppContext', {getProperties});

export default NewItemCreatorDialogContainer;
