import GridContext from './GridContext';
import HttpDatastore from 'rollun-ts-datastore/dist/HttpDatastore';
import Query from 'rollun-ts-rql/dist/Query';

export interface DataItem {
	id: number;
	value: string;
	isValid: boolean;
}

export default class AppContext {

	private _invalidator: () => void;
	private _grid: GridContext;
	private _dataFromServer: DataItem[] = [];
	private _datastore: HttpDatastore;

	constructor(invalidator: () => void, initialState: { grid: GridContext }) {
		this._invalidator = invalidator;
		this._grid = initialState.grid;
		this._datastore = new HttpDatastore('./data.json');
	}

	get grid(): GridContext {
		return this._grid;
	}

	set grid(gridValues: GridContext) {
		this._grid = gridValues;
		this._invalidator();
	}

	get dataFromServer(): DataItem[] {
		return this._dataFromServer;
	}

	reloadGridData() {
		this._datastore.query(new Query({}))
			.then((data: {}[]) => {
					this._dataFromServer = <DataItem[]> data;
					this._invalidator();
				}
			);
	}
}
