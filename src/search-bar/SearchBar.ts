import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import * as css from '../styles/searchBar.m.css';
import { v } from '@dojo/framework/widget-core/d';
import AbstractQueryNode from 'rollun-ts-rql/dist/nodes/AbstractQueryNode';
import { Column } from '../grid/widgets/interfaces';
import Alike from 'rollun-ts-rql/dist/nodes/scalarNodes/Alike';
import Like from 'rollun-ts-rql/dist/nodes/scalarNodes/Like';
import Or from 'rollun-ts-rql/dist/nodes/logicalNodes/Or';
import { VNode } from '@dojo/framework/widget-core/interfaces';

export interface SearchBarProps {
	setFilterNode(node: AbstractQueryNode): Promise<any>;

	columns: Column[];
}

export default class SearchBar extends WidgetBase<SearchBarProps> {
	private searchValue = '';

	protected render(): VNode {
		return v('div', {classes: css.searchBar}, [
			v('input', {
				type: 'text',
				classes: 'form-control',
				placeholder: 'Search in table',
				value: this.searchValue,
				onchange: (event: Event) => {
					// @ts-ignore
					this.searchValue = event.target.value;
					this.invalidate();
				}
			}),
			v('button', {
				classes: 'btn btn-sm btn-primary',
				onclick: () => {
					this.search(this.searchValue);
				}
			}, [
				v('i', {classes: 'fas fa-search'})
			])
		]);
	}

	private search(value: string) {
		const searchNodesArray: Alike[] = [];
		this.properties.columns.forEach((column) => {
			// searchNodesArray.push(new Alike(column.field, value))//FIXME: like or alike for search?
			searchNodesArray.push(new Like(column.field, value));
		});
		this.properties.setFilterNode(new Or(searchNodesArray)).then(() => {
			this.invalidate();
		});
	}
}
