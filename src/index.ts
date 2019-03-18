import Common from './common';
import Context from './context';
import Query from './query-manager';
// @ts-ignore
import { Grid as RGrid } from './grid';
// @ts-ignore
import AppContextInterface from './context/AppContextInterface';
// @ts-ignore
import { Cell, CellProps } from './grid/widgets/Cell';
// @ts-ignore
import { ColumnHeaderCell } from './grid/widgets/ColumnHeaderCell';
// @ts-ignore
import { ColumnHeaders, ColumnHeadersProps } from './grid/widgets/ColumnHeaders';
// @ts-ignore
import { ContextReducers } from './containers/MultiContextContainer';
// @ts-ignore
import GridContext from './context/GridContext';
// @ts-ignore
import { NoData } from './grid/widgets/NoData';
// @ts-ignore
import QueryManager from './query-manager/QueryManager';
// @ts-ignore
import { Row, RowProps } from './grid/widgets/row/Row';
// @ts-ignore
import { VNode, WidgetBaseInterface, WidgetProperties, WNode } from '@dojo/framework/widget-core/interfaces';
// @ts-ignore
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
// @ts-ignore
import { GridProps } from './grid/widgets/Grid';
// @ts-ignore
import * as interfaces from './common/interfaces';

const RGridLib = {
	Common,
	Context,
	RGrid,
	Query,
};
export default RGridLib;
