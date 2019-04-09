import QueryAppContext from './QueryAppContext';
import Query from 'rollun-ts-rql/dist/Query';

export interface FilterRecord {
	query: Query;
	name: string;

}

export default class FilterEditorAppContext extends QueryAppContext {
	static APP_CONTEXT_NAME = 'filterEditorAppContext';
	static GRID_CONTEXT_NAME = 'filterEditorGridContext';
	static QUERY_EDITOR_CONTEXT_NAME = 'filterEditorQueryEditorContext';
}
