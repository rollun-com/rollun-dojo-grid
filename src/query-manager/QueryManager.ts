import Query from 'rollun-ts-rql/dist/Query';
import * as _ from 'lodash';
import AbstractNode from 'rollun-ts-rql/dist/nodes/AbstractNode';
import AbstractQueryNode from 'rollun-ts-rql/dist/nodes/AbstractQueryNode';
import Select from 'rollun-ts-rql/dist/nodes/Select';
import And from 'rollun-ts-rql/dist/nodes/logicalNodes/And';
import Sort from 'rollun-ts-rql/dist/nodes/Sort';
import Limit from 'rollun-ts-rql/dist/nodes/Limit';

export default class QueryManager {
	private query: Query;

	setQuery(query: Query) {
		this.query = _.cloneDeep(query);
	}

	getQuery() {
		return _.cloneDeep(this.query);
	}

	appendQuery(node: AbstractNode) {
		if (node instanceof AbstractQueryNode) {
			this.addQueryNodeToQuery(node);
		} else {
			this.addNotQueryNodeToQuery(node);
		}
	}

	setQueryQuery(node: AbstractQueryNode) {
		const oldQuery = this.getQuery();
		this.setQuery(new Query({
			select: oldQuery.selectNode,
			sort: oldQuery.sortNode,
			limit: oldQuery.limitNode,
			query: node
		}));
	}

	private addQueryNodeToQuery(node: AbstractQueryNode) {
		const oldQuery = this.getQuery();
		let newQueryQueryNode: AbstractQueryNode;
		if (oldQuery.queryNode) {
			newQueryQueryNode = new And([oldQuery.queryNode, node]);
		} else {
			newQueryQueryNode = node;
		}
		this.setQuery(new Query({
			select: oldQuery.selectNode,
			sort: oldQuery.sortNode,
			limit: oldQuery.limitNode,
			query: newQueryQueryNode
		}));
	}

	private addNotQueryNodeToQuery(node: AbstractNode) {
		const currentQuery = this.getQuery();
		let newQuery: Query;
		switch (true) {
			case node instanceof Select:
				const castedSelectNode = <Select> node;
				newQuery = new Query({
					select: castedSelectNode,
					sort: currentQuery.sortNode,
					limit: currentQuery.limitNode,
					query: currentQuery.queryNode
				});
				break;

			case (node instanceof Sort):
				const castedSortNode = <Sort> node;
				newQuery = new Query({
					select: currentQuery.selectNode,
					sort: castedSortNode,
					limit: currentQuery.limitNode,
					query: currentQuery.queryNode
				});
				break;

			case node instanceof Limit:
				const castedLimitNode = <Limit> node;
				newQuery = new Query({
					select: currentQuery.selectNode,
					sort: currentQuery.sortNode,
					limit: castedLimitNode,
					query: currentQuery.queryNode
				});
				break;

			default:
				newQuery = currentQuery;
		}
		this.setQuery(newQuery);
	}
}
