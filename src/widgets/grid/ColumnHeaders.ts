import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import {Column} from './interfaces';
import {v, w} from "@dojo/framework/widget-core/d";
import * as css from '../../styles/grid/header.m.css';
import ColumnHeaderCell from "./ColumnHeaderCell";

export interface ColumnHeadersProps {
    columns: Column[]
}

export default class ColumnHeaders extends WidgetBase<ColumnHeadersProps> {
    protected render() {
        const {columns} = this.properties;
        return v('div', {}, [
            v('tr', {classes: css.columnHeaders}, columns.map((column: Column) => {
                return w(ColumnHeaderCell, {column})
            }))
        ])
    }
}
