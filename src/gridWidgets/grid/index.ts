import { Grid as GridWidget } from './widgets/Grid';
import { Row as RowWidget } from './widgets/row/Row';
import { Cell as CellWidget } from './widgets/Cell';
import { ColumnHeaders as HeaderWidget } from './widgets/ColumnHeaders';
import { ColumnHeaderCell as HeaderCellWidget } from './widgets/ColumnHeaderCell';
import { NoData as NoDataWidget } from './widgets/NoData';
const Grid = {
	Grid: GridWidget,
	Row: RowWidget,
	Cell: CellWidget,
	Header: HeaderWidget,
	HeaderCell: HeaderCellWidget,
	NoData: NoDataWidget
};
export default Grid;
