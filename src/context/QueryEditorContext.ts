import Query from 'rollun-ts-rql/dist/Query';
import QueryManager from '../queryManager/QueryManager';
import Select from 'rollun-ts-rql/dist/nodes/Select';
import Sort from 'rollun-ts-rql/dist/nodes/Sort';

export enum QueryNodeNames {
	select = 'select',
	sort = 'sort',
	limit = 'limit',
	query = 'query'
}

export default class QueryEditorContext {
	private _invalidator: () => void;
	private _queryManager: QueryManager;
	private _onApplyQuery: (query: Query) => void;

	constructor(invalidator: () => void, query: Query, onApplyQuery: (query: Query) => void) {
		this._invalidator = invalidator;
		this._queryManager = new QueryManager();
		this._queryManager.setQuery(query);
		this._onApplyQuery = onApplyQuery;
	}

	get query(): Query {
		return this._queryManager.getQuery();
	}

	onApplyQuery(query: Query) {
		this._onApplyQuery(query);
	}

	setSelectNode(node: Select) {
		const oldQuery = this.query;
		this._queryManager.setQuery(new Query({
			select: node,
			sort: oldQuery.sortNode,
			limit: oldQuery.limitNode,
			query: oldQuery.queryNode
		}));
		this._invalidator();
	}

	setSortNode(node: Sort) {
		const oldQuery = this.query;
		this._queryManager.setQuery(new Query({
			select: oldQuery.selectNode,
			sort: node,
			limit: oldQuery.limitNode,
			query: oldQuery.queryNode
		}));
		this._invalidator();
	}

	removeNode(queryNodeName: QueryNodeNames) {
		const oldQuery = this.query;
		switch (true) {
			case queryNodeName === QueryNodeNames.select: {
				this._queryManager.setQuery(new Query({
					sort: oldQuery.sortNode,
					limit: oldQuery.limitNode,
					query: oldQuery.queryNode
				}));
				break;
			}
			case queryNodeName === QueryNodeNames.sort: {
				this._queryManager.setQuery(new Query({
					select: oldQuery.selectNode,
					limit: oldQuery.limitNode,
					query: oldQuery.queryNode
				}));
				break;
			}
			case queryNodeName === QueryNodeNames.limit: {
				this._queryManager.setQuery(new Query({
					select: oldQuery.selectNode,
					sort: oldQuery.sortNode,
					query: oldQuery.queryNode
				}));
				break;
			}
			case queryNodeName === QueryNodeNames.query: {
				this._queryManager.setQuery(new Query({
					select: oldQuery.selectNode,
					sort: oldQuery.sortNode,
					limit: oldQuery.limitNode,
				}));
				break;
			}
		}
		this._invalidator();
	}

	removeFieldFromNode(fieldName: string, nodeName: (QueryNodeNames.select | QueryNodeNames.sort)) {
		const oldQuery = this.query;
		switch (nodeName) {
			case QueryNodeNames.select:
				const fieldNameIndex = oldQuery.selectNode.fields.indexOf(fieldName);
				if (fieldNameIndex !== -1) {
					oldQuery.selectNode.fields.splice(fieldNameIndex, 1);
					const newFields = [...oldQuery.selectNode.fields];
					 this.setSelectNode(new Select(newFields));
				}
				break;
			case QueryNodeNames.sort:
				if (oldQuery.sortNode.sortOptions.hasOwnProperty(fieldName)) {
					delete oldQuery.sortNode.sortOptions[fieldName];
					const newSortOptions = Object.assign({}, oldQuery.sortNode.sortOptions);
					this.setSortNode(new Sort(newSortOptions));
				}
				break;
		}
		this._invalidator();
	}
}
