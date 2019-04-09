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
import CsvDownloaderContainer from '../containers/CsvDownloaderContainer';
import RowEditorDialogContainer from '../containers/RowEditorDialogContainer';
import NewItemCreatorDialogContainer from '../containers/NewItemCreatorDialogContainer';
import { v, w } from '@dojo/framework/widget-core/d';
import { FluidWidgetNames } from '../common/interfaces';
import FilterEditorAppWidgetContainer from '../containers/filterEditor/filterEditorAppWidgetContainer';

export interface FluidQueryAppWidgetProps {
	isEditingFilters: boolean;

	setEditingFilters(value: boolean): void;
}

export default class FluidQueryAppWidget extends WidgetBase<FluidQueryAppWidgetProps> {

	static contextConfig: ContextConfig = new ContextConfig(QueryAppContext, [Grid, QueryEditor]);

	protected render(): DNode | DNode[] {
		return v('div',
			{
				id: 'queryApp'
			},
			[
				v('button', {
						classes: `${bs.btn} ${bs.btnInfo} ${bs.btnBlock}`,
						onclick: () => {
							this.properties.setEditingFilters(!this.properties.isEditingFilters);
						}
					},
					[
						'Edit filters'
					]),
				...this.renderContent()
			]
		);
	}

	protected renderContent(): DNode[] {

		if (this.properties.isEditingFilters) {
			return [w(FilterEditorAppWidgetContainer, {})];
		} else {
			return [v('div',
				{
					classes: `${bs.dFlex} ${bs.bgLight} ${bs.px1} ${bs.py2} ${bs.border} ${bs.borderBottom0}`
				},
				[
					v('div',
						{
							classes: `${bs.dFlex} ${bs.flexRow} ${bs.alignItemsCenter} ${bs.flexWrap}`,
							styles: {
								flex: '5'
							}
						},
						[
							v('div',
								{classes: `${bs.mx1} ${bs.mb1} ${bs.mbMd0}`},
								[
									w(QueryEditorContainerModalContainer, {})
								]
							),
							v('div',
								{classes: `${bs.mx1} ${bs.mb1} ${bs.mbMd0}`},
								[
									w(CsvDownloaderContainer, {})
								]
							),
							v('div',
								{classes: `${bs.mx1} ${bs.mb1} ${bs.mbMd0}`},
								[
									w(FluidWidgetNames.addNewItemForm, {}) || w(NewItemCreatorDialogContainer, {})
								]
							),
							v('div',
								{classes: `${bs.mx1} ${bs.mb1} ${bs.mbMd0}`},
								[
									w(FluidWidgetNames.editSelectedRowForm, {}) || w(RowEditorDialogContainer, {})
								]
							),
						]
					),
					v('div',
						{
							classes: `${bs.dFlex} ${bs.flexRowReverse}`,
							styles: {flex: '2'}
						},
						[
							w(SearchBarContainer, {})
						]
					)
				],
			),
				w(GridContainer, {}),
				v('div',
					{classes: `${bs.dFlex} ${bs.w100} ${bs.p1} ${bs.bgLight} ${bs.border} ${bs.borderTop0}`},
					[
						w(PaginatorContainer, {})
					]
				)
			];
		}
	}
}
