import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import AbstractQueryNode from 'rollun-ts-rql/dist/nodes/AbstractQueryNode';
import { FieldInfo, LoadingStatusEnum, RowFields } from '../../common/interfaces';
import Alike from 'rollun-ts-rql/dist/nodes/scalarNodes/Alike';
import Or from 'rollun-ts-rql/dist/nodes/logicalNodes/Or';
import { VNode } from '@dojo/framework/widget-core/interfaces';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';
import * as fa from 'rollun-common/dist/css/fontawesome.m.css';
import * as faSolid from 'rollun-common/dist/css/solid.m.css';
import * as ownCss from './searchBar.m.css';

export interface SearchBarProps {
	rowFields: RowFields;
	loadingStatus: LoadingStatusEnum;

	setFilterNode(node: AbstractQueryNode): void;

	cancelSearch(): void;
}

export default class SearchBar extends WidgetBase<SearchBarProps> {
	private searchValue = '';
	private searchIsApplied = false;
	private rowFields: RowFields = {fieldsInfo: []};

	protected render(): VNode {
		if (this.properties.rowFields.fieldsInfo.length > this.rowFields.fieldsInfo.length) {
			this.rowFields = this.properties.rowFields;
		}
		const isLoading = this.properties.loadingStatus === LoadingStatusEnum.loading;
		let rootNodeClasses = `${bs.dFlex} ${bs.flexRow} ${bs.mx1}`;
		if (isLoading) {
			rootNodeClasses += ownCss.loading;
		}
		return v('div',
			{classes: rootNodeClasses},
			[
				v('div',
					{},
					[
						v('input',
							{
								styles: {
									minWidth: '150px',
								},
								disabled: isLoading,
								type: 'text',
								classes: `${bs.formControl} ${bs.formControlSm}`,
								placeholder: 'Search in table',
								value: this.searchValue,
								onchange: (event: Event) => {
									// @ts-ignore
									this.searchValue = event.target.value;
									this.invalidate();
								}
							}
						)
					]
				),
				v('div',
					{},
					[
						v('button',
							{
								classes: `${bs.btn}  ${bs.btnSm} ${bs.btnDanger}`,
								disabled: (!this.searchIsApplied || isLoading),
								onclick: () => {
									this.cancelSearch();
								}
							},
							[
								v('i', {classes: `${faSolid.fas} ${fa.faBan}`})
							]
						)
					]),
				v('div',
					{},
					[
						v('button', {
							classes: `${bs.btn} ${bs.btnSm} ${bs.btnPrimary}`,
							disabled: isLoading,
							onclick: () => {
								this.search(this.searchValue);
							}
						}, [
							v('i', {classes: `${faSolid.fas} ${fa.faSearch}`})
						]),
					]
				),
			]
		);
	}

	private search(value: string) {
		const searchNodesArray: Alike[] = [];
		this.rowFields.fieldsInfo.forEach((fieldInfo: FieldInfo) => {
			searchNodesArray.push(new Alike(fieldInfo.name, value));
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
