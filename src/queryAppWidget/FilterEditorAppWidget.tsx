import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';
import ContextConfig from '../common/ContextConfig';
import { Grid, GridProps } from '../gridWidgets/grid/widgets/Grid';
import QueryEditor from '../queryEditor';
import { v, w } from '@dojo/framework/widget-core/d';
import FilterEditorAppContext from '../context/FilterEditorAppContext';
import FilterGridContainer from '../containers/filterEditor/filterGridContainer';
import FilterEditorSearchBarContainer from '../containers/filterEditor/filterSearchBarContainer';
import FilterEditorPaginatorContainer from '../containers/filterEditor/filterPaginatorContainer';
import GridContext from '../context/GridContext';
import { FieldInfo } from '../common/interfaces';

export interface FilterEditorAppWidgetProps {
	onApplySelectedQuery(): void;
}

function getPropertiesFromGridContext(inject: GridContext, properties: GridProps): Partial<GridProps> {
	return {
		context: inject,
	};
}

function getPropertiesFromAppContext(inject: FilterEditorAppContext, properties: GridProps): Partial<GridProps> {
	const {datastoreData, datastoreDataLoadingStatus, changeCellValue} = inject;
	const rowRows = {
		rows: datastoreData.map((item: any, index: number) => {
				return {
					id: item.id || inject.idArray[index],
					cells: Object.values(item).map((value: string) => {
						return {
							value
						};
					})
				};
			}
		)
	};
	const fieldsConfig = inject.fieldsConfig;
	const rowFields = {
		fieldsInfo: datastoreData[0]
			? Object.keys(datastoreData[0]).map((fieldName: string, index: number): FieldInfo => {
					const configForField = fieldsConfig.find((value: FieldInfo) => value.name === fieldName);

					let finalFieldInfo: FieldInfo = {
						name: fieldName,
						isEditable: true
					};
					if (configForField) {
						finalFieldInfo = {...finalFieldInfo, ...configForField};
					}
					return finalFieldInfo;
				}
			)
			: []
	};
	return {
		fields: rowFields,
		rows: rowRows,
		loadingStatus: datastoreDataLoadingStatus,
		changeCellValue: changeCellValue.bind(inject)
	};
}
const contextReducers = {};
contextReducers[`${FilterEditorAppContext.GRID_CONTEXT_NAME}`] = getPropertiesFromGridContext;
contextReducers[`${FilterEditorAppContext.APP_CONTEXT_NAME}`] = getPropertiesFromAppContext;

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
				w(FilterGridContainer, {contextReducers}),
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
