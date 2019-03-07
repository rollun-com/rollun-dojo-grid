import { ColumnInfo, DataRecord } from '../common/interfaces';

namespace RGrid.GridContext {
	export interface InitialGridState {
		columns: ColumnInfo[];
	}

	export class GridContext {
		private _invalidator: () => void;
		private _columns: ColumnInfo[];
		private _values: DataRecord[] = [];

		constructor(invalidator: () => void, initialState: InitialGridState) {
			this._columns = initialState.columns;
			this._invalidator = invalidator;
		}

		get columns(): ColumnInfo[] {
			return this._columns;
		}

		set columns(value: ColumnInfo[]) {
			this._columns = value;
			this._invalidator();
		}

		get values(): {}[] {
			return this._values;
		}

		set values(gridValues: {}[]) {
			this._values = gridValues;
			this._invalidator();
		}
	}
}
