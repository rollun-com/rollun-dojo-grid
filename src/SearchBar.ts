import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import * as css from '../styles/searchBar.m.css';
import {v, w} from '@dojo/framework/widget-core/d';
import TextInput from '@dojo/widgets/text-input';
import AbstractQueryNode from 'rollun-ts-rql/dist/nodes/AbstractQueryNode';
import {Column} from "./gridComponents/interfaces";
import Alike from 'rollun-ts-rql/dist/nodes/scalarNodes/Alike';
import Like from 'rollun-ts-rql/dist/nodes/scalarNodes/Like';
import Or from 'rollun-ts-rql/dist/nodes/logicalNodes/Or';
import {VNode} from "@dojo/framework/widget-core/interfaces";


export interface SearchBarProps {
    setFilterNode(node: AbstractQueryNode): Promise<any>

    columns: Column[]
}

export default class SearchBar extends WidgetBase<SearchBarProps> {
    private value: string;

    protected render(): VNode {
        return v('div', {classes: css.searchBar}, [
            w(TextInput, {
                placeholder: 'search in grid',
                value: this.value,
                onInput: (value) => {
                    this.value = value
                }
            }),
            v('button', {
                onclick: () => {
                    this.search(this.value)
                }
            }, [' Search '])
        ])
    }

    private search(value: string) {
        const searchNodesArray: Alike[] = [];
        this.properties.columns.forEach((column) => {
            //searchNodesArray.push(new Alike(column.field, value))//FIXME: like or alike for search?
            searchNodesArray.push(new Like(column.field, value))
        });
        this.properties.setFilterNode(new Or(searchNodesArray)).then(() => {
            this.invalidate()
        })
    }
}
