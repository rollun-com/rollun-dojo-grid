import Container from '@dojo/framework/widget-core/Container';
import QueryEditorContext, { QueryNodeNames } from '../../context/QueryEditorContext';
import SortNodeEditor, { SortNodeEditorProps } from '../../queryEditor/sortNodeEditor/SortNodeEditor';
import Sort, { SortOptions } from 'rollun-ts-rql/dist/nodes/Sort';

function getProperties(inject: QueryEditorContext, properties: Partial<SortNodeEditorProps>): SortNodeEditorProps {
	return {
		node: inject.query.sortNode,
		onRemove: ()=>{inject.removeNode(QueryNodeNames.sort);},
		onSortNodeChange: (sortOptions: SortOptions)=> {
			inject.setSortNode(new Sort(sortOptions));
		}
	};
}

const SortNodeEditorContainer: Container<SortNodeEditor> = Container(SortNodeEditor, 'queryEditorContext', {getProperties});

export default SortNodeEditorContainer;
