import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import {v, w} from '@dojo/framework/widget-core/d';
import Grid from './Grid';
import Paginator from "./Paginator";
import Query from 'rollun-ts-rql/dist/Query';
import {DataStoreInterface} from 'rollun-ts-datastore/dist/interfaces';
import RqlQueryManager from "./RqlQueryManager";
import {Column} from './gridComponents/interfaces'
import Limit from 'rollun-ts-rql/dist/nodes/Limit';
import SearchBar from "./SearchBar";
import AbstractQueryNode from 'rollun-ts-rql/dist/nodes/AbstractQueryNode';
import {VNode} from '@dojo/framework/widget-core/interfaces';

export interface CompositeProps {
    store: DataStoreInterface,
    initialQuery?: Query,
}

export interface CompositeState {
    gridData: {}[],
    gridColumns: Column[],
    totalNumberOfItems: number,
    pageNumber: number,
}

export default class Composite extends WidgetBase<CompositeProps> {

    private store: DataStoreInterface;

    private queryManager: RqlQueryManager = new RqlQueryManager();

    private state: CompositeState = {
        gridData: [],
        gridColumns: [],
        totalNumberOfItems: 0,
        pageNumber: 1,
    };

    private isStarted = false;

    protected render(): VNode {
        if (!this.store) {
            this.store = this.properties.store
        }
        if (!this.isStarted) {
            this.queryManager.setQuery(new Query({limit: new Limit(20, 0)}));
            this.updateGridData();
            this.isStarted = true;
        }
        const items = this.state.gridData;
        const columns = this.state.gridColumns;
        const pageSizeOptions = ['20', '50', '100'];
        const totalNumberOfItems = this.state.totalNumberOfItems;
        const numberOfItemsInGrid = this.state.gridData.length;
        const setLimitNode = (node: Limit) => this.setLimitNode(node);
        const setFilterNode = (node: AbstractQueryNode) => this.setFilterNode(node);
        return v('div', {}, [
            w(SearchBar, {setFilterNode, columns}),
            w(Paginator, {setLimitNode, pageSizeOptions, totalNumberOfItems, numberOfItemsInGrid}),
            w(Grid, {items, columns}),
        ])
    }

    private updateGridData(): Promise<any> {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.store.query(this.queryManager.getQuery()),
                this.store.count()
            ]).then((results) => {
                const [data, totalItems] = results;
                this.state.gridColumns = this.getGridColumnsFromItem(data[0])
                this.state.gridData = data;
                this.state.totalNumberOfItems = totalItems;
                this.invalidate();
                resolve();
            })
        })
    }

    private getGridColumnsFromItem(item: {}): Column[] {
        const columns: Column[] = [];
        Object.keys(item).forEach((fieldName) => {
            columns.push({field: fieldName});
        });
        return columns;
    }

    private setLimitNode(node: Limit) {
        return new Promise((resolve, reject) => {
            this.queryManager.appendQuery(node);
            this.updateGridData().then(() => {
                resolve();
            })
        });
    }
    private setFilterNode(node: AbstractQueryNode) {
        return new Promise((resolve, reject) => {
            this.queryManager.setQueryQuery(node);
            this.updateGridData().then(() => {
                resolve();
            })
        });
    }
}
