import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';
import ContextConfig from '../common/ContextConfig';
import { Grid } from '../gridWidgets/grid/widgets/Grid';
import QueryEditor from '../queryEditor';
import { v, w } from '@dojo/framework/widget-core/d';
import FilterEditorAppContext from '../context/FilterEditorAppContext';
import FilterGridContainer from '../containers/filterEditor/filterGridContainer';
import FilterEditorSearchBarContainer from '../containers/filterEditor/filterSearchBarContainer';
import FilterEditorPaginatorContainer from '../containers/filterEditor/filterPaginatorContainer';

export interface FilterEditorAppWidgetProps {
	onApplySelectedQuery(): void;
}

export default class FilterEditorAppWidget extends WidgetBase<FilterEditorAppWidgetProps> {

	static contextConfig: ContextConfig = new ContextConfig(FilterEditorAppContext, [Grid, QueryEditor]);

	protected render(): DNode | DNode[] {
		return v('div',
			{
				id: 'filterEditorApp'
			},
			[
				v('div',
					{
						classes: `${bs.dFlex} ${bs.bgLight} ${bs.px1} ${bs.py2} ${bs.border} ${bs.borderBottom0}`
					},
					[
						v('div',
							{
								classes: `${bs.dFlex} ${bs.flexRow} ${bs.alignItemsCenter} ${bs.flexWrap}`, styles: {
									flex: '5'
								}
							},
							[
								v('div',
									{classes: `${bs.mx1} ${bs.mb1} ${bs.mbMd0}`},
									[
										v('button',
											{
												classes: `${bs.btn} ${bs.btnSuccess} ${bs.btnSm}`,
												onclick: () => {
													this.properties.onApplySelectedQuery();
												}
											},
											[
												'Apply selected query'
											]
										)
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
								w(FilterEditorSearchBarContainer, {})
							]
						)
					],
				),
				w(FilterGridContainer, {}),
				v('div',
					{classes: `${bs.dFlex} ${bs.w100} ${bs.p1} ${bs.bgLight} ${bs.border} ${bs.borderTop0}`},
					[
						w(FilterEditorPaginatorContainer, {})
					]
				)
			],
		);
	}
}
