import { DNode, Constructor } from '@dojo/framework/widget-core/interfaces';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { CellEditorProps } from '../gridWidgets/grid/widgets/editors/CellEditor';

export interface FieldInfo {
	name: string;
	label?: string;
	isEditable?: boolean;
	minWidth?: number;
	renderer?(value: string): DNode;
	editor?: GridCellEditor;
}

export type GridCellEditor =  Constructor<WidgetBase<Partial<CellEditorProps>>>;

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

export enum FluidWidgetNames {
	addNewItemForm = 'addNewItemForm',
	editSelectedRowForm = 'editSelectedRowForm',
}
