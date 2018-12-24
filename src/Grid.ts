import WidgetBase from "@dojo/framework/widget-core/WidgetBase";
import {Column} from './gridComponents/interfaces';
import {v, w} from '@dojo/framework/widget-core/d';
import ColumnHeaders from './gridComponents/ColumnHeaders';
import * as css from '../styles/grid.m.css';
import Body from "./gridComponents/Body";
import {VNode} from "@dojo/framework/widget-core/interfaces";

export interface GridProps {
    columns: Column[],
    items: {}[]
}

export default class Grid extends WidgetBase<GridProps> {
    protected render(): VNode {
        const {columns, items} = this.properties;
        return v('div', {classes: css.grid}, [
            w(ColumnHeaders, {columns}),
            w(Body, {columns, items})
        ])
    }
}