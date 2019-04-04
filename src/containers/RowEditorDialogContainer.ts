import QueryAppContext, { QueryAppDialogNames } from '../context/QueryAppContext';
import RowEditorDialog, { RowEditorDialogProps } from '../dialog/RowEditorDialog';
import MultiContextContainer from '../common/MultiContextContainer';
import GridContext from '../context/GridContext';

function getPropertiesFromQueryAppContext(inject: QueryAppContext, properties: Partial<RowEditorDialogProps>): Partial<RowEditorDialogProps> {
	const formConfig = inject.datastoreData[0] ? Object.keys(inject.datastoreData[0]).map((fieldName: string) => {
			return {field: fieldName};
		})
		: [];
	const item = inject.datastoreData[0] ?
		inject.datastoreData[inject.selectedGridRowIndex]
		: {};
	const isOpen = inject.dialogs.get(QueryAppDialogNames.editSelectedRowDialog).shown;
	const openDialog = () => {inject.dialogs.show(QueryAppDialogNames.editSelectedRowDialog); };
	const closeDialog = () => {inject.dialogs.hide(QueryAppDialogNames.editSelectedRowDialog); };
	return {
		formConfig,
		onFormSubmit: inject.changeRowValue.bind(inject),
		item,
		isOpen,
		openDialog,
		closeDialog
	};
}

function getPropertiesFromGridContext(inject: GridContext, properties: Partial<RowEditorDialogProps>): Partial<RowEditorDialogProps> {
	const selectedRowIndex = inject.selectedRowIndex;
	return {selectedRowIndex};
}

const RowEditorDialogContainer: MultiContextContainer<RowEditorDialog> = MultiContextContainer(RowEditorDialog,
	{
		'queryAppContext': getPropertiesFromQueryAppContext,
		'gridContext': getPropertiesFromGridContext
	});

export default RowEditorDialogContainer;
