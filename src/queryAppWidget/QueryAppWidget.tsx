import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import QueryEditorContainerModalContainer from '../containers/queryBuilder/queryEditorContainerModalContainer';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import GridContainer from '../containers/grid/GridContainer';
import SearchBarContainer from '../containers/grid/SearchBarContainer';
import PaginatorContainer from '../containers/grid/PaginatorContainer';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';
import ContextConfig from '../common/ContextConfig';
import QueryAppContext from '../context/QueryAppContext';
import { Grid } from '../gridWidgets/grid/widgets/Grid';
import QueryEditor from '../queryEditor';
import { tsx } from '@dojo/framework/widget-core/tsx';

export default class QueryAppWidget extends WidgetBase {

	static contextConfig: ContextConfig = new ContextConfig(QueryAppContext, [Grid, QueryEditor]);

	protected render(): DNode | DNode[] {
		return (<div id='gridContainer'>
			<QueryEditorContainerModalContainer>

			</QueryEditorContainerModalContainer>
			<div classNames={`${bs.dFlex} ${bs.bgLight} ${bs.px1} ${bs.py2} ${bs.border} ${bs.borderBottom0}`}>
				<SearchBarContainer>

				</SearchBarContainer>
			</div>
			<GridContainer>

			</GridContainer>
			<div
				classNames={`${bs.dFlex} ${bs.w100} ${bs.flexRowReverse} ${bs.px1} ${bs.py2} ${bs.bgLight} ${bs.border} ${bs.borderTop0}`}>
				<PaginatorContainer>

				</PaginatorContainer>
			</div>
		</div>);
	}
}
