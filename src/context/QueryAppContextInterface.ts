import GridContext from './GridContext';
import Limit from 'rollun-ts-rql/dist/nodes/Limit';
import AbstractQueryNode from 'rollun-ts-rql/dist/nodes/AbstractQueryNode';
import { LoadingStatusEnum, FieldInfo } from '../common/interfaces';
import Query from 'rollun-ts-rql/dist/Query';
import DialogController from './DialogController';

export interface DataItem {
	id: number;
	value: string;
	isValid: boolean;
}

export default interface QueryAppContextInterface {
	grid: GridContext;
	datastoreData: DataItem[];
	datastoreDataLoadingStatus: LoadingStatusEnum;
	countData: number;
	countDataLoadingStatus: LoadingStatusEnum;
	idArray: string[];
	fieldsConfig: FieldInfo[];
	query: Query;
	dialogs: DialogController;

	reloadGridData(): void;

	setQueryLimit(limitNode: Limit): void;

	setQueryQuery(queryQuery: AbstractQueryNode): void;

	removeQueryQuery(): void;

	changeCellValue(rowIndex: number, columnIndex: number, value: string): void;

}
