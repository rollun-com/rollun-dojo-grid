import { RowFields, RowRows } from '../common/interfaces';

export interface InitialGridState {
	fields?: RowFields;
	rows?: RowRows;
}

export default class GridContext {
	private _invalidator: () => void;
	private _rowFields: RowFields;
	private _rowRows: RowRows;

	constructor(invalidator: () => void, initialState: InitialGridState) {
		this._invalidator = invalidator;
		if (initialState.fields) {
			this._rowFields = initialState.fields;
		}
		if (initialState.rows) {
			this._rowRows = initialState.rows;
		}
	}

	get rowFields(): RowFields {
		return this._rowFields;
	}

	set rowFields(fields: RowFields) {
		this._rowFields = fields;
		this._invalidator();
	}

	get rowRows(): RowRows {
		return this._rowRows;
	}

	set rowRows(rows: RowRows) {
		this._rowRows = rows;
		this._invalidator();
	}
}
