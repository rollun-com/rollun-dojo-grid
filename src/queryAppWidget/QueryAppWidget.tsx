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
import CsvDownloaderContainer from '../containers/CsvDownloaderContainer';
import RowEditorDialogContainer from '../containers/RowEditorDialogContainer';
import NewItemCreatorDialogContainer from '../containers/NewItemCreatorDialogContainer';

export default class QueryAppWidget extends WidgetBase {

	static contextConfig: ContextConfig = new ContextConfig(QueryAppContext, [Grid, QueryEditor]);

	protected render(): DNode | DNode[] {
		return (<div id='gridContainer'>
			<div class={`${bs.dFlex} ${bs.bgLight} ${bs.px1} ${bs.py2} ${bs.border} ${bs.borderBottom0}`}>
				<div class={`${bs.dFlex} ${bs.flexRow} ${bs.alignItemsCenter}`} styles={{flex: '5'}}>
					<div class={`${bs.mx1}`}>
						<QueryEditorContainerModalContainer>

						</QueryEditorContainerModalContainer>
					</div>
					<div class={`${bs.mx1}`}>
						<CsvDownloaderContainer>

						</CsvDownloaderContainer>
					</div>
					<div class={`${bs.mx1}`}>
						<RowEditorDialogContainer>

						</RowEditorDialogContainer>
					</div>
					<div class={`${bs.mx1}`}>
						<NewItemCreatorDialogContainer>

						</NewItemCreatorDialogContainer>
					</div>
				</div>
				<div class={`${bs.dFlex} ${bs.flexRowReverse}`} styles={{flex: '2'}}>
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
