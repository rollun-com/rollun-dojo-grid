import WidgetBase from "@dojo/framework/widget-core/WidgetBase";
import * as css from './row.m.css';
import {v, w} from '@dojo/framework/widget-core/d';
import {Column} from "./interfaces";
import {DNode, VNode} from '@dojo/framework/widget-core/interfaces';
import Cell from './Cell';

export default class Row extends WidgetBase<{ columns: Column[], item: {} }> {
    protected render():VNode {
        const {columns, item} = this.properties;
        return v('div', {classes: css.row}, columns.map((column: Column): DNode => {
                const value: any = item[column.field];
                const content: string = String(value);
                return w(Cell, {content, column, value})
            }
        ))
    }
}

