import RowContainer from './grid/RowContainer';
// @ts-ignore
import MultiContextContainer, { ContextReducers } from './MultiContextContainer';
import GridContainer from './grid/GridContainer';
import ColumnHeaderCellContainer from './grid/ColumnHeaderCellContainer';
import ColumnHeadersContainer from './grid/ColumnHeaadersContainer';
import CellContainer from './grid/CellContainer';
// @ts-ignore
import Cell, { CellProps } from '../gridWidgets/grid/widgets/Cell';
// @ts-ignore
import { DefaultWidgetBaseInterface, VNode, WidgetBaseInterface, WidgetProperties, WNode }
	from '@dojo/framework/widget-core/interfaces';
// @ts-ignore
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
// @ts-ignore
import { RowCells } from '../common/interfaces';
// @ts-ignore
import { ColumnHeadersProps } from '../gridWidgets/grid/widgets/ColumnHeaders';
// @ts-ignore
import { GridProps } from '../gridWidgets/grid/widgets/Grid';
// @ts-ignore
import { RowProps } from '../gridWidgets/grid/widgets/row/Row';

const Containers = {
	CellContainer,
	ColumnHeadersContainer,
	ColumnHeaderCellContainer,
	GridContainer,
	MultiContextContainer,
	RowContainer
};
export default Containers;
