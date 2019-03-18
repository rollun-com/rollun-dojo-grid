import GridContext from './GridContext';
import Limit from 'rollun-ts-rql/dist/nodes/Limit';
import AbstractQueryNode from 'rollun-ts-rql/dist/nodes/AbstractQueryNode';
import { LoadingStatusEnum, FieldInfo } from '../common/interfaces';
import Query from 'rollun-ts-rql/dist/Query';

export interface DataItem {
	id: number;
	value: string;
	isValid: boolean;
}

export default interface AppContextInterface {
	grid: GridContext;
	datastoreData: DataItem[];
	datastoreDataLoadingStatus: LoadingStatusEnum;
	countData: number;
	countDataLoadingStatus: LoadingStatusEnum;
	idArray: string[];
	fieldsConfig: FieldInfo[];
	query: Query;

	reloadGridData(): void;

	setQueryLimit(limitNode: Limit): void;

	setQueryQuery(queryQuery: AbstractQueryNode): void;

	removeQueryQuery(): void;

	changeDataItem(rowIndex: number, columnIndex: number, value: string): void;

}
