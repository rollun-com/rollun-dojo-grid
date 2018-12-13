import Query from "rollun-ts-rql/dist/Query";
import AbstractNode from 'rollun-ts-rql/dist/nodes/AbstractNode';
import {Map} from "@dojo/framework/shim/main";
import AbstractQueryNode from 'rollun-ts-rql/dist/nodes/AbstractQueryNode';
import Select from 'rollun-ts-rql/dist/nodes/Select';
import Sort from 'rollun-ts-rql/dist/nodes/Sort';
import Limit from 'rollun-ts-rql/dist/nodes/Limit';
import And from 'rollun-ts-rql/dist/nodes/logicalNodes/And';
import * as _ from 'lodash';

export default class RqlQueryManager {
    private nodeCache: Map<string, AbstractNode>;
    private query: Query;
    private defaultQuery: Query;

    constructor(initialQuery?: Query) {
        if (initialQuery) {
            this.query = initialQuery;
        }
        else {
            this.query = new Query({});
        }
        this.nodeCache = new Map();
        this.defaultQuery = _.cloneDeep(this.query);
    }

    setQuery(query: Query) {
        this.query = _.cloneDeep(query)
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
            case node instanceof Select: {
                const castedSelectNode = <Select>node;
                newQuery = new Query({
                    select: castedSelectNode,
                    sort: currentQuery.sortNode,
                    limit: currentQuery.limitNode,
                    query: currentQuery.queryNode
                });
                break;
            }

            case (node instanceof Sort): {
                const castedSortNode = <Sort>node;
                newQuery = new Query({
                    select: currentQuery.selectNode,
                    sort: castedSortNode,
                    limit: currentQuery.limitNode,
                    query: currentQuery.queryNode
                });
                break;
            }

            case node instanceof Limit: {
                const castedLimitNode = <Limit>node;
                newQuery = new Query({
                    select: currentQuery.selectNode,
                    sort: currentQuery.sortNode,
                    limit: castedLimitNode,
                    query: currentQuery.queryNode
                });
                break;
            }
            default: {
                newQuery = currentQuery;
            }
        }
        this.setQuery(newQuery);
    }

    addToCache(id: string, node: AbstractNode) {
        this.nodeCache.set(id, node)
    }

    removeFromCache(id: string) {
        this.nodeCache.delete(id);
    }

    setQueryFromCache() {
        this.setQuery(this.defaultQuery);
        this.nodeCache.forEach((node) => {
            this.appendQuery(node);
        })
    }
}
