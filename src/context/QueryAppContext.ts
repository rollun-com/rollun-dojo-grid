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
import DialogController from './DialogController';
import FilterEditorAppContext from './FilterEditorAppContext';

export interface DataItem {
	id: number;
	value: string;
	isValid: boolean;
}

export enum QueryAppDialogNames {
	addNewItemDialog = 'addNewItemDialog',
	editSelectedRowDialog = 'editSelectedRowDialog',
	editQueryDialog = 'editQueryDialog',
}

export interface QueryAppContextInitialState {
	datastoreUrl: string;
	grid: GridContext;
	filterEditorContext?: FilterEditorAppContext;
	fieldsConfig?: FieldInfo[];
}

export default class QueryAppContext implements QueryAppContextInterface {
	readonly name: string;

	private _invalidator: () => void;
	private _grid: GridContext;
	private _queryManager: QueryManager;
	private _dataStoreDataUpdater: DatastoreDataUpdater<DataItem>;
	private _countDataUpdater: DatastoreCountUpdater;
	private _datastore: HttpDatastore;
	private _idArray: string[];
	private _fieldsConfig: FieldInfo[];
	private _dialogs: DialogController;
	private _filterEditor: FilterEditorAppContext;
	private _isEditingFilters: boolean;

	constructor(invalidator: () => void, name: string, initialState: QueryAppContextInitialState) {
		this._invalidator = invalidator;
		this.name = name;
		this._grid = initialState.grid;
		this._queryManager = new QueryManager();
		this._queryManager.setQuery(new Query({limit: new Limit(20, 0)}));
		this._datastore = new HttpDatastore(initialState.datastoreUrl);
		this._dataStoreDataUpdater = new DatastoreDataUpdater<DataItem>(this._datastore);
		this._countDataUpdater = new DatastoreCountUpdater(this._datastore);
		this._fieldsConfig = initialState.fieldsConfig || [];
		if (initialState.filterEditorContext) {
			this._filterEditor = initialState.filterEditorContext;
		}
		this._isEditingFilters = false;
		const addNewItemDialogId = QueryAppDialogNames.addNewItemDialog; // FIXME: why can`t i properly use enums in dialogController constructor params?
		const editSelectedRowDialogId = QueryAppDialogNames.editSelectedRowDialog;
		const editQueryDialogId = QueryAppDialogNames.editQueryDialog;
		const initialStatus = {};
		initialStatus[addNewItemDialogId] = {shown: false};
		initialStatus[editSelectedRowDialogId] = {shown: false};
		initialStatus[editQueryDialogId] = {shown: false};
		this._dialogs = new DialogController(invalidator, initialStatus);
		setTimeout(() => {
			this.reloadGridData();
		}, 1);
	}

	get query(): Query {
		return this._queryManager.getQuery();
	}

	set query(query: Query) {
		this._queryManager.setQuery(query);
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

	get dialogs() {
		return this._dialogs;
	}

	get isEditingFilters(): boolean {
		return this._isEditingFilters;
	}

	set isEditingFilters(value: boolean) {
		this._isEditingFilters = value;
		this._invalidator();
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

	applyQueryFromFilterEditor() {
		const filterRow: any = this._filterEditor.datastoreData[this._filterEditor.grid.selectedRowIndex];
		const query = filterRow.query;
		console.log(query);
		this._isEditingFilters = false;
		this._invalidator();
	}
}
