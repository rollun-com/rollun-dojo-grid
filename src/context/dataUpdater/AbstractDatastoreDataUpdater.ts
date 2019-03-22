import AbstractDataUpdater from './AbstractDataUpdater';
import { DataStoreInterface } from 'rollun-ts-datastore/dist/interfaces';
import Query from 'rollun-ts-rql/dist/Query';
import QueryManager from '../../queryManager/QueryManager';

export default abstract class AbstractDatastoreDataUpdater<T> extends AbstractDataUpdater<T> {
	protected _datastore: DataStoreInterface;
	protected _queryManager: QueryManager;

	constructor(datastore: DataStoreInterface) {
		super();
		this._datastore = datastore;
		this._queryManager = new QueryManager();
	}

	set query(query: Query) {
		this._queryManager.setQuery(query);
	}

	get query(): Query {
		return this._queryManager.getQuery();
	}

	protected _updateData(): Promise<T> {
		return new Promise((resolve, reject) => {
			this._datastore.query(this.getProcessedQuery()).then(
				(data: T) => {
					resolve(data);
				},
				(error) => {
					reject(error);
				}
			);
		});
	}

	protected abstract getProcessedQuery(): Query;
}
