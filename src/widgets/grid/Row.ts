import WidgetBase from "@dojo/framework/widget-core/WidgetBase";
import * as css from '../../styles/row.m.css';
import {v, w} from '@dojo/framework/widget-core/d';
import {Column, Item} from "../interfaces";
import {DNode} from '@dojo/framework/widget-core/interfaces';
import Cell from './Cell';

export default class Row extends WidgetBase<{ columns: Column[], item: Item<any> }> {
    protected render() {
        const {columns, item} = this.properties;
        return v('div', {classes: css.row}, columns.map((column: Column): DNode => {
                const value: any = item.data[column.field];
                const content: string = String(value);
                return w(Cell, {content, column, value})
            }
        ))
    }
}

