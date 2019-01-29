import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import * as css from '../styles/paginator.m.css';
import Limit from 'rollun-ts-rql/dist/nodes/Limit';
import { VNode } from '@dojo/framework/widget-core/interfaces';
import { DataStoreResponseDependent } from '../common/interfaces';

export interface PaginatorProps extends DataStoreResponseDependent {
	setLimitNode(node: Limit): void;

	pageSizeOptions: string[];
}

export default class Paginator extends WidgetBase<PaginatorProps> {

	private currentPageSize = '20';
	private pageNumber = 1;

	protected render(): VNode {
		return v('div', {classes: css.pagination}, [
			v('div', {classes: css.controls}, [
				v('div',
					{classes: css.buttonGroup},
					[
						v('button', {
							classes: 'btn btn-sm btn-light border ' + css.controlButton,
							onclick: () => {
								this.goToPage(this.pageNumber - 1);
							}
						}, [
							v('i', {classes: 'fas fa-arrow-left'})
						]),
						v('div', {
								classes: css.pageNumber
							},
							[` ${this.pageNumber} `]),
						v('button', {
								classes: 'btn btn-sm btn-light border ' + css.controlButton,
								onclick: () => {
									this.goToPage(this.pageNumber + 1);
								}
							},
							[
								v('i', {classes: 'fas fa-arrow-right'})
							]
						)
					]),
				v('div',
					{classes: css.pageSizeGroup},
					[
						v('div', {classes: css.pageSizeLabel}, ['Page size']),
						v('select',
							{
								classes: 'custom-select',
								onChange: (event: Event) => {
									// @ts-ignore
									this.changePageSize(event.target.value);
								}
							},
							this.properties.pageSizeOptions.map(
								(pageSize) => v('option', {value: pageSize}, [pageSize]))
						)
					]
				)
			]),
			v('div', {classes: css.info}, [
				this.getInfo()
			])
		]);
	}

	private goToPage(pageNumber: number) {
		if (pageNumber < 1) {
			return;
		}
		this.pageNumber = pageNumber;
		const currentPageSize = parseInt(this.currentPageSize, 10);
		const offset = currentPageSize * (this.pageNumber - 1);
		this.properties.setLimitNode(new Limit(currentPageSize, offset));
	}

	private changePageSize(pageSize: string) {
		this.currentPageSize = pageSize;
		this.goToPage(1);
	}

	private getInfo(): string {
		const {currentCount, totalCount} = this.properties.responseInfo;
		const currentPageSize = parseInt(this.currentPageSize, 10);
		const startItemNumber = currentPageSize * (this.pageNumber - 1) + 1; // FIXME: wrong item count when grid is showing 'No data'
		const endItemNumber = startItemNumber + currentCount - 1;
		return `Showing items ${startItemNumber}-${endItemNumber} of ${totalCount}`;
	}
}
