import Container from '@dojo/framework/widget-core/Container';
import QueryEditorContext from '../../context/QueryEditorContext';
import AbstractScalarNode from 'rollun-ts-rql/dist/nodes/scalarNodes/AbstractScalarNode';
import ScalarNodeEditor, { ScalarNodeEditorProps } from '../../queryEditor/queryQueryEditor/scalarNodeEditor/ScalarNodeEditor';

function getProperties(inject: QueryEditorContext, properties: Partial<ScalarNodeEditorProps>): ScalarNodeEditorProps {
	const {path, fieldNames} = properties;
	const node = <AbstractScalarNode> inject.getNodeForPath(path);
	const onRemove = inject.removeNodeForPath.bind(inject);
	return {
		path,
		fieldNames,
		node,
		onRemove
	};
}

const ScalarNodeEditorContainer: Container<ScalarNodeEditor> = Container(ScalarNodeEditor, 'queryEditorContext', {getProperties});

export default ScalarNodeEditorContainer;
