import { DNode } from '@dojo/framework/widget-core/interfaces';

export interface FieldInfo {
	field: string;
	label?: string;
}

export interface ColumnInfo extends FieldInfo {
	minWidth?: number; // min width in px
	widthWeight?: number; // works as flex-grow
	formatter?(value: string): DNode;
	editor?(): DNode;
}

export interface DataStoreResponseInfo {
	totalCount: number;
	currentCount: number;
	fieldsInfo: FieldInfo[];
	data: {}[];
}

export interface DataStoreResponseDependent {
	responseInfo: DataStoreResponseInfo;
}
