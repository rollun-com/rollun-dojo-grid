import Container from '@dojo/framework/widget-core/Container';
import QueryEditorContext from '../../context/QueryEditorContext';
import DropToRemoveNodeField, { DropToRemoveNodeFieldProps } from '../../queryEditor/dropToRemoveNodeField/DropToRemoveNodeField';

function getProperties(inject: QueryEditorContext, properties: Partial<DropToRemoveNodeFieldProps>): DropToRemoveNodeFieldProps {
	return {
		onNodeFieldRemove: (fieldName, nodeName) => {
			inject.removeFieldFromNode(fieldName, nodeName);
		}
	};
}

const DropToRemoveNodeFieldContainer: Container<DropToRemoveNodeField> = Container(DropToRemoveNodeField, 'queryEditorContext', {getProperties});

export default DropToRemoveNodeFieldContainer;
