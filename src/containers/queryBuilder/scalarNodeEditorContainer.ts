import Container from '@dojo/framework/widget-core/Container';
import QueryEditorContext from '../../context/QueryEditorContext';
import AbstractScalarNode from 'rollun-ts-rql/dist/nodes/scalarNodes/AbstractScalarNode';
import ScalarNodeEditor, { ScalarNodeEditorProps } from '../../queryEditor/queryQueryEditor/scalarNodeEditor/ScalarNodeEditor';

function getProperties(inject: QueryEditorContext, properties: Partial<ScalarNodeEditorProps>): ScalarNodeEditorProps {
	const {path, key} = properties;
	const node = inject.hasNodeForPath(path)
		? <AbstractScalarNode> inject.getNodeForPath(path)
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

const ScalarNodeEditorContainer: Container<ScalarNodeEditor> = Container(ScalarNodeEditor, 'queryEditorContext', {getProperties});

export default ScalarNodeEditorContainer;
