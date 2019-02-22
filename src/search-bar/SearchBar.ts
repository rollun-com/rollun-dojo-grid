import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import AbstractQueryNode from 'rollun-ts-rql/dist/nodes/AbstractQueryNode';
import { DataStoreResponseDependent, FieldInfo } from '../common/interfaces';
import Alike from 'rollun-ts-rql/dist/nodes/scalarNodes/Alike';
import Or from 'rollun-ts-rql/dist/nodes/logicalNodes/Or';
import { VNode } from '@dojo/framework/widget-core/interfaces';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';
import * as fa from 'rollun-common/dist/css/fontawesome.m.css';
import * as faSolid from 'rollun-common/dist/css/solid.m.css';

export interface SearchBarProps extends DataStoreResponseDependent {
	setFilterNode(node: AbstractQueryNode): void;
	cancelSearch(): void;
}

export default class SearchBar extends WidgetBase<SearchBarProps> {
	private searchValue = '';
	private searchIsApplied = false;
	private fieldsInfo: FieldInfo[] = [];

	protected render(): VNode {
		const newFieldsInfo = this.properties.responseInfo.fieldsInfo;
		if (newFieldsInfo.length > this.fieldsInfo.length) {
			this.fieldsInfo = newFieldsInfo;
		}
		return v('div', {classes: `${bootstrap.dFlex} ${bootstrap.flexRow} ${bootstrap.mx1}`}, [
			v('input', {
				type: 'text',
				classes: `${bootstrap.formControl}`,
				placeholder: 'Search in table',
				value: this.searchValue,
				onchange: (event: Event) => {
					// @ts-ignore
					this.searchValue = event.target.value;
					this.invalidate();
				}
			}),
			v('button', {
				classes: `${bootstrap.btn}  ${bootstrap.btnSm} ${bootstrap.btnPrimary}`,
				onclick: () => {
					this.search(this.searchValue);
				}
			}, [
				v('i', {classes: `${faSolid.fas} ${fa.faSearch}`})
			]),
			v('button',
				{
				classes: `${bootstrap.btn}  ${bootstrap.btnSm} ${bootstrap.btnDanger}`,
				disabled: !this.searchIsApplied,
				onclick: () => {
					this.cancelSearch();
				}
			},
				[
				v('i', {classes: `${faSolid.fas} ${fa.faBan}`})
			])
		]);
	}

	private search(value: string) {
		const searchNodesArray: Alike[] = [];
		this.fieldsInfo.forEach((fieldInfo) => {
			searchNodesArray.push(new Alike(fieldInfo.field, value));
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
