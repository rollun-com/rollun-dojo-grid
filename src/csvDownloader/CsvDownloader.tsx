import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { tsx } from '@dojo/framework/widget-core/tsx';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';

export interface CsvDownloaderProps {
	title?: string;
	fileName?: string;
	data: {}[];
}

export default class CsvDownloader extends WidgetBase<CsvDownloaderProps> {

	protected render(): DNode | DNode[] {
		return (
			<button
				class={`${bs.btn} ${bs.btnPrimary} ${bs.btnSm}`}
				onclick={() => {
					this.downloadCsv();
				}}>
				{this.properties.title || 'Download table'}
			</button>
		);
	}

	protected downloadCsv() {
		const csvContent = 'data:text/csv;charset=utf-8,' + this.getDataInCsv();
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement('a');
		link.setAttribute('href', encodedUri);
		link.setAttribute('download', this.properties.fileName || 'data.csv');
		link.target = '_blank';
		link.style.display = 'none';
		document.body.appendChild(link);
		link.click();
	}

	protected getDataInCsv(): string {
		const data = this.properties.data.map((dataRecord, index: number) => {
			return Object.values(dataRecord);
		});
		const dataString = data.map(row => row.join(',')).join('\n');
		const columnHeadersString = Object.keys(this.properties.data[0]).join(',');
		return `${columnHeadersString}\n${dataString}`;
	}
}
