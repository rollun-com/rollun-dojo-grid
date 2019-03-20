import Container from '@dojo/framework/widget-core/Container';
import QueryEditorContext from '../../context/QueryEditorContext';
import ArrayNodeEditor, { ArrayNodeEditorProps } from '../../queryEditor/queryQueryEditor/arrayNodeEditor/ArrayNodeEditor';
import AbstractArrayNode from 'rollun-ts-rql/dist/nodes/arrayNodes/AbstractArrayNode';

function getProperties(inject: QueryEditorContext, properties: Partial<ArrayNodeEditorProps>): ArrayNodeEditorProps {
	const {path, fieldNames} = properties;
	const node = <AbstractArrayNode> inject.getNodeForPath(path);
	const onRemove = inject.removeNodeForPath.bind(inject);
	return {
		path,
		fieldNames,
		node,
		onRemove
	};
}

const ArrayNodeEditorContainer: Container<ArrayNodeEditor> = Container(ArrayNodeEditor, 'queryEditorContext', {getProperties});

export default ArrayNodeEditorContainer;
