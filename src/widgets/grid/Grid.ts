import WidgetBase from "@dojo/framework/widget-core/WidgetBase";
import {Column} from './interfaces';
import {v, w} from '@dojo/framework/widget-core/d';
import ColumnHeaders from './ColumnHeaders';
import * as css from '../../styles/grid/grid.m.css';
import Body from "./Body";

export interface GridProps {
    columns: Column[],
    items: {}[]
}

export default class Grid extends WidgetBase<GridProps> {
    protected render() {
        const {columns, items} = this.properties;
        return v('div', {classes: css.grid}, [
            w(ColumnHeaders, {columns}),
            w(Body, {columns, items})
        ])
    }
}
