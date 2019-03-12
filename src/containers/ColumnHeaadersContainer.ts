import Container  from '@dojo/framework/widget-core/Container';
import GridContext from '../context/GridContext';
// @ts-ignore
import { ColumnHeaders, ColumnHeadersProps } from '../grid/widgets/ColumnHeaders';
// @ts-ignore
import Cell, { CellProps } from '../grid/widgets/Cell';
// @ts-ignore
import { DefaultWidgetBaseInterface, VNode, WidgetBaseInterface, WidgetProperties, WNode
} from '@dojo/framework/widget-core/interfaces';
// @ts-ignore
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';

function getProperties(inject: GridContext, properties: any) {
	const {rowIndex} = properties;
	const columns = inject.rowFields;
	return {
		columns,
		rowIndex
	};
}

const ColumnHeadersContainer = Container(ColumnHeaders, 'gridContext', {getProperties});

export default ColumnHeadersContainer;
