import GridContext from './GridContext';
import HttpDatastore from 'rollun-ts-datastore/dist/HttpDatastore';
import Query from 'rollun-ts-rql/dist/Query';
import Limit from 'rollun-ts-rql/dist/nodes/Limit';
import AbstractQueryNode from 'rollun-ts-rql/dist/nodes/AbstractQueryNode';
import { LoadingStatusEnum } from '../common/interfaces';
import QueryManager from '../query-manager/QueryManager';

export interface DataItem {
	id: number;
	value: string;
	isValid: boolean;
}

export default class AppContext {

	private _invalidator: () => void;
	private _grid: GridContext;
	private _dataFromServer: (DataItem[] | null) = [];
	private _datastore: HttpDatastore;
	private _queryManager: QueryManager;
	private _loadingStatus: LoadingStatusEnum = LoadingStatusEnum.loaded;

	constructor(invalidator: () => void, initialState: { grid: GridContext }) {
		this._invalidator = invalidator;
		this._grid = initialState.grid;
		this._datastore = new HttpDatastore('/api/datastore/test_csv');
		this._queryManager = new QueryManager();
		this._queryManager.setQuery(new Query({limit: new Limit(20, 0)}));
	}

	get grid(): GridContext {
		return this._grid;
	}

	set grid(gridValues: GridContext) {
		this._grid = gridValues;
		this._invalidator();
	}

	get dataFromServer(): (DataItem[] | null) {
		return this._dataFromServer;
	}

	get loadingStatus(): LoadingStatusEnum {
		return this._loadingStatus;
	}

	reloadGridData() {
		this._loadingStatus = LoadingStatusEnum.loading;
		this._invalidator();
		this._datastore.query(this._queryManager.getQuery())
			.then((data: {}[]) => {
					this._dataFromServer = <DataItem[]> data;
					this._loadingStatus = LoadingStatusEnum.loaded;
					this._invalidator();
				}
			);
	}

	setQueryLimit(limitNode: Limit) {
		this._queryManager.appendQuery(limitNode);
		this.reloadGridData();
	}

	setQueryQuery(queryQuery: AbstractQueryNode) {
		this._queryManager.appendQuery(queryQuery);
		this.reloadGridData();
	}

	removeQueryQuery() {
		const oldQuery = this._queryManager.getQuery();
		this._queryManager.setQuery(new Query({
			select: oldQuery.selectNode,
			sort: oldQuery.sortNode,
			limit: oldQuery.limitNode,
		}));
		this.reloadGridData();
	}

	changeDataItem(rowIndex: number, columnIndex: number, value: string): void {

	}
}
