import Query from 'rollun-ts-rql/dist/Query';
import AbstractDatastoreDataUpdater from './AbstractDatastoreDataUpdater';
import Select from 'rollun-ts-rql/dist/nodes/Select';
import AggregateFunctionNode from 'rollun-ts-rql/dist/nodes/aggregateNodes/AggregateFunctionNode';

export default class DatastoreCountUpdater extends AbstractDatastoreDataUpdater<number> {
	protected _data = 0;

	protected getProcessedQuery(): Query {
		const oldQuery = this._queryManager.getQuery();
		return new Query({
			select: oldQuery.selectNode
				? new Select([
					...oldQuery.selectNode.fields,
					new AggregateFunctionNode('count', 'id')
				])
				: new Select([
					new AggregateFunctionNode('count', 'id')
				])
		});
	}

	protected afterProcess(data) {
		return data[0]['count(id)'];
	}
}
