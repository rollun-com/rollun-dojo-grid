import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import * as css from '../styles/searchBar.m.css';
import { v } from '@dojo/framework/widget-core/d';
import AbstractQueryNode from 'rollun-ts-rql/dist/nodes/AbstractQueryNode';
import { DataStoreResponseDependent } from '../common/interfaces';
import Alike from 'rollun-ts-rql/dist/nodes/scalarNodes/Alike';
import Like from 'rollun-ts-rql/dist/nodes/scalarNodes/Like';
import Or from 'rollun-ts-rql/dist/nodes/logicalNodes/Or';
import { VNode } from '@dojo/framework/widget-core/interfaces';

export interface SearchBarProps extends DataStoreResponseDependent {
	setFilterNode(node: AbstractQueryNode): void;
	cancelSearch(): void;
}

export default class SearchBar extends WidgetBase<SearchBarProps> {
	private searchValue = '';
	private searchIsApplied = false;

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
			]),
			v('button',
				{
				classes: 'btn btn-sm btn-danger',
				disabled: !this.searchIsApplied,
				onclick: () => {
					this.cancelSearch();
				}
			},
				[
				v('i', {classes: 'fas fa-ban'})
			])
		]);
	}

	private search(value: string) {
		const {fieldsInfo} = this.properties.responseInfo;
		const searchNodesArray: Alike[] = [];
		fieldsInfo.forEach((fieldInfo) => {
			// searchNodesArray.push(new Alike(fieldInfo.field, value))//FIXME: like or alike for search?
			searchNodesArray.push(new Like(fieldInfo.field, value));
		});
		this.searchIsApplied = true;
		this.properties.setFilterNode(new Or(searchNodesArray));
	}

	private cancelSearch(): void {
		this.properties.cancelSearch();
		this.searchIsApplied = false;
		this.searchValue = '';
		this.invalidate();
	}
}
