import Container from '@dojo/framework/widget-core/Container';
import QueryEditorContext from '../../context/QueryEditorContext';
import ArrayNodeEditor, { ArrayNodeEditorProps } from '../../queryEditor/queryQueryEditor/arrayNodeEditor/ArrayNodeEditor';
import AbstractArrayNode from 'rollun-ts-rql/dist/nodes/arrayNodes/AbstractArrayNode';

function getProperties(inject: QueryEditorContext, properties: Partial<ArrayNodeEditorProps>): ArrayNodeEditorProps {
	const {path, key} = properties;
	const node = inject.hasNodeForPath(path)
		? <AbstractArrayNode> inject.getNodeForPath(path)
		: null;
	const onRemove = inject.removeNodeForPath.bind(inject);
	const fieldNames = inject.fieldNames;
	return {
		path,
		fieldNames,
		node,
		onRemove,
		key
	};
}

const ArrayNodeEditorContainer: Container<ArrayNodeEditor> = Container(ArrayNodeEditor, 'queryEditorContext', {getProperties});

export default ArrayNodeEditorContainer;
