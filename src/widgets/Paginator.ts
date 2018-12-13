import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import {v, w} from '@dojo/framework/widget-core/d';
import * as css from '../styles/paginator.m.css';
import Select from '@dojo/widgets/Select';
import Limit from 'rollun-ts-rql/dist/nodes/Limit';

export interface PaginatorProps {
    setLimitNode(node: Limit): Promise<any>,

    pageSizeOptions: string[],
    totalNumberOfItems: number,
    numberOfItemsInGrid: number,
}

export default class Paginator extends WidgetBase<PaginatorProps> {

    private currentPageSize: string = '20';
    private pageNumber: number = 1;


    protected render() {
        return v('div', {classes: css.pagination}, [
            v('div', {classes: css.controls}, [
                v('button', {
                    onclick: () => {
                        this.goToPage(this.pageNumber - 1)
                    }
                }, [' previous ']),
                v('span', {}, [` ${this.pageNumber} `]),
                v('button', {
                    onclick: () => {
                        this.goToPage(this.pageNumber + 1)
                    }
                }, [' next ']),
                w(Select, {
                    label: 'Select page size',
                    options: this.properties.pageSizeOptions,
                    value: this.currentPageSize,
                    onChange: (option: string) => {
                        this.changePageSize(option);
                    }
                })
            ]),
            v('div', {classes: css.info}, [
                this.getInfo()
            ])
        ])
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
        return `Showing items ${startItemNumber}-${endItemNumber} of ${this.properties.totalNumberOfItems}`
    }

}
