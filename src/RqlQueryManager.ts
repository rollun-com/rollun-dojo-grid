import Query from "rollun-ts-rql/dist/Query";
import AbstractNode from 'rollun-ts-rql/dist/nodes/AbstractNode';
import {Map} from "@dojo/framework/shim/main";
import {deepMixin} from "@dojo/framework/core/util";

export default class RqlQueryManager {
    protected nodeCache: Map<string, Query | AbstractNode>;
    protected query: Query;

    constructor(initialQuery?: Query) {
        if (initialQuery) {
            this.query = initialQuery;
        }
        else {
            this.query = new Query({});
        }
        this.nodeCache = new Map([['default', deepMixin({}, this.query)]]);

    }

}
