import {v} from '@dojo/framework/widget-core/d';
import {Column} from './interfaces';
import WidgetBase from "@dojo/framework/widget-core/WidgetBase";
import * as css from "../../styles/grid/header.m.css";


export interface ColumnHeaderCellProps {
    column: Column
}

export default class ColumnHeaderCell extends WidgetBase<ColumnHeaderCellProps> {
    protected render() {
        const {column} = this.properties;
        return v('th', {classes: css.cell}, [
            v('span', {}, [column.label || column.field]),
            v('div', {})//TODO: sort arrow
        ])
    }
}
