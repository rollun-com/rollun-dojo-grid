import Container from '@dojo/framework/widget-core/Container';
import QueryAppContext from '../context/QueryAppContext';
import CsvDownloader, { CsvDownloaderProps } from '../csvDownloader/CsvDownloader';

function getProperties(inject: QueryAppContext, properties: Partial<CsvDownloaderProps>): CsvDownloaderProps {
	const data = inject.datastoreData;
	return {
		data
	};
}

const CsvDownloaderContainer: Container<CsvDownloader> = Container(CsvDownloader, 'queryAppContext', {getProperties});

export default CsvDownloaderContainer;
