export interface FieldInfo {
	field: string;
	label?: string;
}

export interface ColumnInfo extends FieldInfo {

}

export interface DataStoreResponseInfo {
	totalCount: number;
	currentCount: number;
	fieldsInfo: FieldInfo[];
}

export interface DataStoreResponseDependent {
	responseInfo: DataStoreResponseInfo;
}