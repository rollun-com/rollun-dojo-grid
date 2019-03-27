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
			<div class={`${bs.dFlex} ${bs.bgLight} ${bs.px1} ${bs.py2} ${bs.border} ${bs.borderBottom0}`}>
				<div class={`${bs.dFlex} ${bs.flexRow}`} styles={{flex: '3'}}>
					<QueryEditorContainerModalContainer>

					</QueryEditorContainerModalContainer>
					<button class={`${bs.btn} ${bs.btnPrimary} ${bs.mx1} ${bs.btnSm}`}>Btn</button>
					<button class={`${bs.btn} ${bs.btnPrimary} ${bs.mx1} ${bs.btnSm}`}>Btn</button>
				</div>
				<div class={`${bs.dFlex} ${bs.flexRowReverse}`} styles={{flex: '1'}}>
					<SearchBarContainer>

					</SearchBarContainer>
				</div>

			</div>
			<GridContainer>

			</GridContainer>
			<div class={`${bs.dFlex} ${bs.w100} ${bs.p1} ${bs.bgLight} ${bs.border} ${bs.borderTop0}`}>
				<PaginatorContainer>

				</PaginatorContainer>
			</div>
		</div>);
	}
}
