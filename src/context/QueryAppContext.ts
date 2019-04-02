import Query from 'rollun-ts-rql/dist/Query';
import Limit from 'rollun-ts-rql/dist/nodes/Limit';
import AbstractQueryNode from 'rollun-ts-rql/dist/nodes/AbstractQueryNode';
import DatastoreDataUpdater from './dataUpdater/DatastoreDataUpdater';
import DatastoreCountUpdater from './dataUpdater/DatastoreCountUpdater';
import QueryAppContextInterface from './QueryAppContextInterface';
import QueryManager from '../queryManager/QueryManager';
import GridContext from './GridContext';
import { FieldInfo, LoadingStatusEnum } from '../common/interfaces';
import HttpDatastore from 'rollun-ts-datastore/dist/HttpDatastore';

export interface DataItem {
	id: number;
	value: string;
	isValid: boolean;
}

export default class QueryAppContext implements QueryAppContextInterface {

	private _invalidator: () => void;
	private _grid: GridContext;
	private _queryManager: QueryManager;
	private _dataStoreDataUpdater: DatastoreDataUpdater<DataItem>;
	private _countDataUpdater: DatastoreCountUpdater;
	private _datastore: HttpDatastore;
	private _idArray: string[];
	private _fieldsConfig: FieldInfo[];

	constructor(invalidator: () => void, initialState: { datastoreUrl: string, grid: GridContext, fieldsConfig: FieldInfo[] }) {
		this._invalidator = invalidator;
		this._grid = initialState.grid;
		this._queryManager = new QueryManager();
		this._queryManager.setQuery(new Query({limit: new Limit(20, 0)}));
		this._datastore = new HttpDatastore(initialState.datastoreUrl);
		this._dataStoreDataUpdater = new DatastoreDataUpdater<DataItem>(this._datastore);
		this._countDataUpdater = new DatastoreCountUpdater(this._datastore);
		this._fieldsConfig = initialState.fieldsConfig || [];
		setTimeout(() => {this.reloadGridData(); }, 1);
	}

	get query(): Query {
		return this._queryManager.getQuery();
	}

	get grid(): GridContext {
		return this._grid;
	}

	set grid(gridValues: GridContext) {
		this._grid = gridValues;
		this._invalidator();
	}

	get datastoreData(): DataItem[] {
		return this._dataStoreDataUpdater.data;
	}

	get countData(): number {
		return this._countDataUpdater.data;
	}

	get datastoreDataLoadingStatus(): LoadingStatusEnum {
		return this._dataStoreDataUpdater.loadingStatus;
	}

	get countDataLoadingStatus(): LoadingStatusEnum {
		return this._countDataUpdater.loadingStatus;
	}

	get idArray(): string[] {
		return this._idArray;
	}

	get fieldsConfig(): FieldInfo[] {
		return this._fieldsConfig;
	}

	get selectedGridRowIndex(): number {
		return this._grid.selectedRowIndex;
	}

	reloadGridData() {
		this._dataStoreDataUpdater.query = this._queryManager.getQuery();
		this._dataStoreDataUpdater.updateData().then(() => {
			this._invalidator();
		});
		this._countDataUpdater.query = this._queryManager.getQuery();
		this._countDataUpdater.updateData().then(() => {
			this._idArray = this.datastoreData.map(item => String(item.id));
			this._invalidator();
		});
		this._invalidator();
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

	changeCellValue(rowIndex: number, columnIndex: number, value: string): void {
		let itemToUpdate = {
			id: this._idArray[rowIndex],
		};
		const fieldName = Object.keys(this.datastoreData[0])[columnIndex];
		itemToUpdate[fieldName] = value;
		this._datastore.update(itemToUpdate).then(() => {
			this.reloadGridData();
		});
	}

	changeRowValue(rowIndex: number, changedItem: any) {
		let itemToUpdate = {
			id: this._idArray[rowIndex],
		};
		itemToUpdate = {...itemToUpdate, ...changedItem};
		this._datastore.update(itemToUpdate).then(() => {
			this.reloadGridData();
		});
	}

	addNewItem(item: any) {
		this._datastore.create(item).then(() => {
			this.reloadGridData();
		});
	}
}
