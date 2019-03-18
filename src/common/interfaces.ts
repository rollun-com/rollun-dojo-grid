export interface FieldInfo {
	name: string;
	label?: string;
	isEditable?: boolean;
	width?: number;
}

export interface RowFields { // headers for each column, starting from 1
	fieldsInfo: FieldInfo[]; // [0] corresponds to first column
}

export interface CellData {
	value: string;
}

export interface RowCells { // cells for each row, starting from 1
	id: (number | string);
	cells: CellData[]; // [0] corresponds to first cell
}

export interface RowRows {
	rows: RowCells[];
}

export interface GridData {
	fields: RowFields;
	rows: RowRows;
}

export enum LoadingStatusEnum {
	loading = 'loading',
	loaded = 'loaded',
	error = 'error'
}
