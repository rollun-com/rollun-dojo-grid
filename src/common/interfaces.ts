import { DNode } from '@dojo/framework/widget-core/interfaces';


namespace RGrid {
	namespace Interfaces {
		export interface FieldInfo {
			name: string;
			label?: string;
		}

		export interface CellData {
			field: FieldInfo;
			value: string;
		}

		export interface RowCells {
			id: (string | number);
			cells: CellData[];
		}

		export interface RowRows {
			rows: RowCells[];
		}

		export interface RowFields {
			fieldsInfo: FieldInfo[];
		}

		export interface GridData {
			fields: RowFields;
			rows: RowRows;
		}

// TODO: redo names in interfaces
		export interface ColumnInfo {
			minWidth?: number; // min width in px
			widthWeight?: number; // works as flex-grow
			formatter?(value: string): DNode;

			editor?(): DNode;
		}

		export interface DataStoreResponse {
			totalItemCount: number;
			currentItemCount: number;
			fieldsInfo: RowFields;
			data: GridData;
		}

		export interface DataStoreResponseDependent {
			responseInfo: DataStoreResponse;
		}
	}
}

