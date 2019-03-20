import Container from '@dojo/framework/widget-core/Container';
import QueryEditorContext from '../../context/QueryEditorContext';
import AbstractLogicalNode from 'rollun-ts-rql/dist/nodes/logicalNodes/AbstractLogicalNode';
import LogicalNodeEditor, { LogicalNodeEditorProps } from '../../queryEditor/queryQueryEditor/logicalEditor/LogicalNodeEditor';
import AbstractQueryNode from 'rollun-ts-rql/dist/nodes/AbstractQueryNode';

function getProperties(inject: QueryEditorContext, properties: Partial<LogicalNodeEditorProps>): LogicalNodeEditorProps {
	const {path, fieldNames} = properties;
	const node = <AbstractLogicalNode> inject.getNodeForPath(path);
	const onRemoveSelf = () => {inject.removeNodeForPath(path); };
	const onAddChildNode = (node: AbstractQueryNode, index = 0) => {
		const finalPath = path.concat([index]);
		inject.addNodeForPath(node, finalPath);
	};
	return {
		path,
		fieldNames,
		node,
		onRemoveSelf,
		onAddChildNode
	};
}

const LogicalNodeEditorContainer: Container<LogicalNodeEditor> = Container(LogicalNodeEditor, 'queryEditorContext', {getProperties});

export default LogicalNodeEditorContainer;
