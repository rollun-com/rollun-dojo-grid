import AbstractDatastoreDataUpdater from './AbstractDatastoreDataUpdater';
import Query from 'rollun-ts-rql/dist/Query';

export default class DatastoreDataUpdater<T> extends AbstractDatastoreDataUpdater<T[]> {

	protected _data: T[] = [];

	protected getProcessedQuery(): Query {
		return this._queryManager.getQuery();
	}

}
