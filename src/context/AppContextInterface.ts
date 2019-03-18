import GridContext from './GridContext';
import Limit from 'rollun-ts-rql/dist/nodes/Limit';
import AbstractQueryNode from 'rollun-ts-rql/dist/nodes/AbstractQueryNode';
import { LoadingStatusEnum } from '../common/interfaces';

export interface DataItem {
	id: number;
	value: string;
	isValid: boolean;
}

export default interface AppContextInterface {
	grid: GridContext;
	datastoreData: DataItem[];
	loadingStatus: LoadingStatusEnum;
	idArray: string[];

	reloadGridData(): void;

	setQueryLimit(limitNode: Limit): void;

	setQueryQuery(queryQuery: AbstractQueryNode): void;

	removeQueryQuery(): void;

	changeDataItem(rowIndex: number, columnIndex: number, value: string): void;

}
