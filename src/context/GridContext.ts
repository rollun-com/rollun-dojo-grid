import { RowFields, RowRows } from '../common/interfaces';

export interface InitialGridState {
	fields?: RowFields;
	rows?: RowRows;
}

export default class GridContext {
	private _invalidator: () => void;
	private _rowFields: RowFields;
	private _rowRows: RowRows;
	private _changeDataItem: (rowIndex: number, columnIndex: number, value: string) => void;
	private _selectedRowIndex: number;

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

	set changeDataItem(value: (rowIndex: number, columnIndex: number, value: string) => void) {
		this._changeDataItem = value;
	}

	get selectedRowIndex(): number {
		return this._selectedRowIndex;
	}

	changeCellValue(rowIndex: number, columnIndex: number, value: string) {
		this._changeDataItem(rowIndex, columnIndex, value);
	}

	selectRow(index: number) {
		this._selectedRowIndex = index;
		this._invalidator();
	}
}
