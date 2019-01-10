import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import * as css from '../styles/paginator.m.css';
import Select from '@dojo/widgets/select';
import Limit from 'rollun-ts-rql/dist/nodes/Limit';
import { VNode } from '@dojo/framework/widget-core/interfaces';

export interface PaginatorProps {
	setLimitNode(node: Limit): Promise<any>;

	pageSizeOptions: string[];
	totalNumberOfItems: number;
	numberOfItemsInGrid: number;
}

interface OptionData {
	disabled: boolean;
	label: string;
	value: string;
};

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
							classes: 'btn btn-sm btn-light border' + css.controlButton,
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
								classes: 'btn btn-sm btn-light border' + css.controlButton,
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
						w(Select, {
								extraClasses: {
									'input': 'custom-select',
								},
								getOptionDisabled: (option: OptionData) => option.disabled,
								getOptionLabel: (option: OptionData) => option.label,
								getOptionValue: (option: OptionData) => option.value,
								getOptionSelected: (option: OptionData) => !!value && option.value === value,
								useNativeElement: true,
								options: this.properties.pageSizeOptions.map((value: string) => {
									return {disabled: false, value, label: value};
								}),
								value: this.currentPageSize,
								onChange: (option: string) => {
									this.changePageSize(option);
								}
							}
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

		this.properties.setLimitNode(new Limit(currentPageSize, offset)).then(() => {
			this.invalidate();
		});
	}

	private changePageSize(pageSize: string) {
		this.currentPageSize = pageSize;
		this.goToPage(1);
	}

	private getInfo(): string {
		const currentPageSize = parseInt(this.currentPageSize, 10);
		const startItemNumber = currentPageSize * (this.pageNumber - 1) + 1;
		const endItemNumber = startItemNumber + this.properties.numberOfItemsInGrid - 1;
		return `Showing items ${startItemNumber}-${endItemNumber} of ${this.properties.totalNumberOfItems}`;
	}
}
