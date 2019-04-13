import Query from 'rollun-ts-rql/dist/Query';
import Select from 'rollun-ts-rql/dist/nodes/Select';
import Sort from 'rollun-ts-rql/dist/nodes/Sort';
import AbstractQueryNode from 'rollun-ts-rql/dist/nodes/AbstractQueryNode';
import AbstractLogicalNode from 'rollun-ts-rql/dist/nodes/logicalNodes/AbstractLogicalNode';
import DialogController from './DialogController';

export enum QueryNodeNames {
	select = 'select',
	sort = 'sort',
	limit = 'limit',
	query = 'query'
}

export enum QueryEditorDialogNames {
	addNewNodeDialog = 'addNewNodeDialog'
}

export default class QueryEditorContext {
	readonly name: string;

	private _invalidator: () => void;
	private _onApplyQuery: (query: Query) => void;
	private _fieldNames: string[];
	private _query: Query;
	private _dialogs: DialogController;

	constructor(invalidator: () => void, name: string, ) {
		this._invalidator = invalidator;
		this.name = name;
		this._fieldNames = [];
		const initialStatus = {};
		initialStatus[QueryEditorDialogNames.addNewNodeDialog] = {shown: false};
		this._dialogs = new DialogController(invalidator, initialStatus);
	}

	set onApplyQuery(value: (query: Query) => void) {
		this._onApplyQuery = value;
	}

	get onApplyQuery(): (query: Query) => void {
		return this._onApplyQuery;
	}

	get query(): Query {
		return this._query;
	}

	set query(query: Query) {
		this._query = query;
		this._invalidator();
	}

	get fieldNames(): string[] {
		return this._fieldNames;
	}

	set fieldNames(value: string[]) {
		if (value.length > this._fieldNames.length) {
			this._fieldNames = value;
			this._invalidator();
		}
	}

	get dialogs() {
		return this._dialogs;
	}

	applyQuery(query: Query) {
		this._onApplyQuery(query);
	}

	setQueryNode(node: AbstractQueryNode) {
		const oldQuery = this.query;
		this._query = new Query({
			select: oldQuery.selectNode,
			sort: oldQuery.sortNode,
			limit: oldQuery.limitNode,
			query: node
		});
		this._invalidator();
	}

	setSelectNode(node: Select) {
		const oldQuery = this.query;
		this._query = new Query({
			select: node,
			sort: oldQuery.sortNode,
			limit: oldQuery.limitNode,
			query: oldQuery.queryNode
		});
		this._invalidator();
	}

	setSortNode(node: Sort) {
		const oldQuery = this.query;
		this._query = new Query({
			select: oldQuery.selectNode,
			sort: node,
			limit: oldQuery.limitNode,
			query: oldQuery.queryNode
		});
		this._invalidator();
	}

	removeNode(queryNodeName: QueryNodeNames) {
		const oldQuery = this.query;
		switch (true) {
			case queryNodeName === QueryNodeNames.select: {
				this._query = new Query({
					sort: oldQuery.sortNode,
					limit: oldQuery.limitNode,
					query: oldQuery.queryNode
				});
				break;
			}
			case queryNodeName === QueryNodeNames.sort: {
				this._query = new Query({
					select: oldQuery.selectNode,
					limit: oldQuery.limitNode,
					query: oldQuery.queryNode
				});
				break;
			}
			case queryNodeName === QueryNodeNames.limit: {
				this._query = new Query({
					select: oldQuery.selectNode,
					sort: oldQuery.sortNode,
					query: oldQuery.queryNode
				});
				break;
			}
			case queryNodeName === QueryNodeNames.query: {
				this._query = new Query({
					select: oldQuery.selectNode,
					sort: oldQuery.sortNode,
					limit: oldQuery.limitNode,
				});
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

	getNodeForPath(path: number[]): AbstractQueryNode {
		const query = this.query;
		let currentNode = query.queryNode;
		path.forEach((pathFragment: number, index: number) => {
			if (index === 0) {
				return;
			}
			if (currentNode instanceof AbstractLogicalNode) {
				currentNode = currentNode.subNodes[pathFragment];
			} else {
				throw new Error(`Invalid path: ${path.join(' ')}`);
			}
		});
		return currentNode;
	}

	hasNodeForPath(path: number[]): boolean {
		try {
			this.getNodeForPath(path);
			return true;
		} catch (error) {
			return false;
		}
	}

	removeNodeForPath(path: number[]): void {
		if (path.length === 1 && path[0] === 0) {
			this.removeNode(QueryNodeNames.query);
		} else {
			const parentNodePath = path.slice(0, path.length - 1);
			const parentNode = this.getNodeForPath(parentNodePath);
			if (parentNode instanceof AbstractLogicalNode) {
				parentNode.removeNode(path[path.length - 1]);
				this._invalidator();
			} else {
				throw new Error(`Node with path ${path.join(' ')} doesnt have children`);
			}
		}
	}

	addNodeForPath(node: AbstractQueryNode, path: number[]): void {
		const parentNodePath = path.slice(0, path.length - 1);
		const parentNode = this.getNodeForPath(parentNodePath);
		if (parentNode instanceof AbstractLogicalNode) {
			parentNode.addNode(node);
			this._invalidator();
		} else {
			throw new Error(`Node with path ${path.join(' ')} can't have children`);
		}
	}
}
