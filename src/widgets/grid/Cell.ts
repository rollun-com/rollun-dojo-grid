import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import {DNode} from "@dojo/framework/widget-core/interfaces";
import {v} from '@dojo/framework/widget-core/d';
import * as css from "../../styles/cell.m.css"
import {Column} from "../interfaces";

export interface CellProps {
    content: DNode,
    column: Column,
    value: string
}

export default class Cell extends WidgetBase<CellProps> {
    protected render(): DNode {
        const {content} = this.properties;

        return v('td', {classes: css.cell}, [content]);
    }
}
