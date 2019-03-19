import Container from '@dojo/framework/widget-core/Container';
import QueryEditorContext, { QueryNodeNames } from '../../context/QueryEditorContext';
import SelectNodeEditor, { SelectNodeEditorProps } from '../../queryEditor/selectNodeEditor/SelectNodeEditor';
import Select from 'rollun-ts-rql/dist/nodes/Select';
import AggregateFunctionNode from 'rollun-ts-rql/dist/nodes/aggregateNodes/AggregateFunctionNode';

function getProperties(inject: QueryEditorContext, properties: Partial<SelectNodeEditorProps>): SelectNodeEditorProps {
	const {fieldNames} = inject;
	return {
		node: inject.query.selectNode,
		fieldNames,
		onSelectNodeChange: (fields: (string | AggregateFunctionNode)[]) => {
			inject.setSelectNode(new Select(fields));
		},
		onRemove: () => {
			inject.removeNode(QueryNodeNames.select);
		}
	};
}

const QueryEditorContainer: Container<SelectNodeEditor> = Container(SelectNodeEditor, 'queryEditorContext', {getProperties});

export default QueryEditorContainer;
