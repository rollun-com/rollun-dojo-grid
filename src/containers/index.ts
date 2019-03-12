import RowContainer from './RowContainer';
// @ts-ignore
import MultiContextContainer, { ContextReducers } from './MultiContextContainer';
import GridContainer from './GridContainer';
import ColumnHeaderCellContainer from './ColumnHeaderCellContainer';
import ColumnHeadersContainer from './ColumnHeaadersContainer';
import CellContainer from './CellContainer';
// @ts-ignore
import Cell, { CellProps } from '../grid/widgets/Cell';
// @ts-ignore
import { DefaultWidgetBaseInterface, VNode, WidgetBaseInterface, WidgetProperties, WNode }
	from '@dojo/framework/widget-core/interfaces';
// @ts-ignore
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
// @ts-ignore
import { RowCells } from '../common/interfaces';
// @ts-ignore
import { ColumnHeadersProps } from '../grid/widgets/ColumnHeaders';
// @ts-ignore
import { GridProps } from '../grid/widgets/Grid';
// @ts-ignore
import { RowProps } from '../grid/widgets/row/Row';

const Containers = {
	CellContainer,
	ColumnHeadersContainer,
	ColumnHeaderCellContainer,
	GridContainer,
	MultiContextContainer,
	RowContainer
};
export default Containers;
