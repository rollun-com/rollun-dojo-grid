import Container from '@dojo/framework/widget-core/Container';
import QueryEditorContext from '../../context/QueryEditorContext';
import AbstractLogicalNode from 'rollun-ts-rql/dist/nodes/logicalNodes/AbstractLogicalNode';
import LogicalNodeEditor, { LogicalNodeEditorProps } from '../../queryEditor/queryQueryEditor/logicalEditor/LogicalNodeEditor';
import AbstractQueryNode from 'rollun-ts-rql/dist/nodes/AbstractQueryNode';

function getProperties(inject: QueryEditorContext, properties: Partial<LogicalNodeEditorProps>): LogicalNodeEditorProps {
	const {path, key} = properties;
	const node = inject.hasNodeForPath(path)
		? <AbstractLogicalNode> inject.getNodeForPath(path)
		: null;
	const onRemove = inject.removeNodeForPath.bind(inject);
	const onAddChildNode = (node: AbstractQueryNode, index = 0) => {
		const finalPath = path.concat([index]);
		inject.addNodeForPath(node, finalPath);
	};
	const fieldNames = inject.fieldNames;
	return {
		path,
		fieldNames,
		node,
		onRemove,
		onAddChildNode,
		key
	};
}

const LogicalNodeEditorContainer: Container<LogicalNodeEditor> = Container(LogicalNodeEditor, 'queryEditorContext', {getProperties});

export default LogicalNodeEditorContainer;
