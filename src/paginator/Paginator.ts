/*
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import Limit from 'rollun-ts-rql/dist/nodes/Limit';
import { VNode } from '@dojo/framework/widget-core/interfaces';
import { DataStoreResponseDependent } from '../common/interfaces';
import * as bootstrap from 'rollun-common/dist/css/bootstrap.m.css';
import * as fa from 'rollun-common/dist/css/fontawesome.m.css';
import * as faSolid from 'rollun-common/dist/css/solid.m.css';
import * as ownCss from './paginator.m.css';

export interface PaginatorProps extends DataStoreResponseDependent {
	setLimitNode(node: Limit): void;

	pageSizeOptions: string[];
}

export default class Paginator extends WidgetBase<PaginatorProps> {

	private currentPageSize = '20';
	private pageNumber = 1;

	protected render(): VNode {
		return v('div', {classes: `${bootstrap.dFlex} ${bootstrap.flexRow} ${bootstrap.alignItemsCenter}  ${bootstrap.p1} `}, [
			v('div', {classes: `${bootstrap.dFlex} ${bootstrap.flexRow} ${bootstrap.alignItemsCenter} `}, [
				v('div',
					{classes: `${bootstrap.dFlex} ${bootstrap.flexRow} ${bootstrap.alignItemsCenter}  ${bootstrap.mr4} `},
					[
						v('button', {
							classes: `${bootstrap.btn}  ${bootstrap.btnSm} ${bootstrap.btnLight} ${bootstrap.border}  ${bootstrap.mx1}`,
							onclick: () => {
								this.goToPage(this.pageNumber - 1);
							}
						}, [
							v('i', {classes: `${faSolid.fas} ${fa.faArrowLeft} `})
						]),
						v('div', {
								classes: `${bootstrap.px1}  ${bootstrap.mx1}`
							},
							[` ${this.pageNumber} `]),
						v('button', {
								classes: `${bootstrap.btn}  ${bootstrap.btnSm} ${bootstrap.btnLight} ${bootstrap.border}  ${bootstrap.mx1}`,
								onclick: () => {
									this.goToPage(this.pageNumber + 1);
								}
							},
							[
								v('i', {classes: `${faSolid.fas} ${fa.faArrowRight} `})
							]
						)
					]),
				v('div',
					{classes: `${bootstrap.dFlex} ${bootstrap.flexRow} ${bootstrap.alignItemsCenter}  ${bootstrap.mr4} `},
					[
						v('div',
							{
								classes: `${bootstrap.mx1} ${ownCss.pageSizeLabel}`,
							},
							['Page size']),
						v('select',
							{
								classes: `${bootstrap.customSelect}`,
								onchange: (event: Event) => {
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
			v('div', {classes: `${bootstrap.dFlex} ${bootstrap.flexRow} ${bootstrap.alignItemsCenter}  ${bootstrap.mx1}`}, [
				this.getInfo()
			])
		]);
	}

	private goToPage(pageNumber: number) {
		const currentPageSize = parseInt(this.currentPageSize, 10);
		if (pageNumber < 1 || this.properties.responseInfo.totalCount <= currentPageSize) {
			return;
		}
		this.pageNumber = pageNumber;
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
*/
