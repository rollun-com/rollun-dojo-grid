import Container from '@dojo/framework/widget-core/Container';
import QueryEditorContext, { QueryEditorDialogNames } from '../../context/QueryEditorContext';
import ChildNodeCreationFormDialog, { ChildNodeCreationFormDialogProps } from '../../queryEditor/queryQueryEditor/logicalEditor/ChildNodeCreationFormDialog';

function getProperties(inject: QueryEditorContext, properties: Partial<ChildNodeCreationFormDialogProps>): ChildNodeCreationFormDialogProps {
	const {onChildNodeCreate} = properties;
	const {fieldNames} = inject;
	const isOpen = inject.dialogs.get(QueryEditorDialogNames.addNewNodeDialog).shown;
	const closeDialog = () => {inject.dialogs.hide(QueryEditorDialogNames.addNewNodeDialog); };
	return {
		isOpen,
		closeDialog,
		onChildNodeCreate,
		fieldNames
	};
}

const ChildNodeCreationFormDialogContainer: Container<ChildNodeCreationFormDialog> = Container(ChildNodeCreationFormDialog, 'queryEditorContext', {getProperties});

export default ChildNodeCreationFormDialogContainer;
