import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import QueryEditorContainerModalContainer from '../containers/queryBuilder/queryEditorContainerModalContainer';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import GridContainer from '../containers/grid/GridContainer';
import SearchBarContainer from '../containers/grid/SearchBarContainer';
import PaginatorContainer from '../containers/grid/PaginatorContainer';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';
import ContextConfig from '../common/ContextConfig';
import QueryAppContext from '../context/QueryAppContext';
import { Grid, GridProps } from '../gridWidgets/grid/widgets/Grid';
import QueryEditor from '../queryEditor';
import CsvDownloaderContainer from '../containers/CsvDownloaderContainer';
import RowEditorDialogContainer from '../containers/RowEditorDialogContainer';
import NewItemCreatorDialogContainer from '../containers/NewItemCreatorDialogContainer';
import { v, w } from '@dojo/framework/widget-core/d';
import { FieldInfo, FluidWidgetNames } from '../common/interfaces';
import FilterEditorAppWidgetContainer from '../containers/filterEditor/filterEditorAppWidgetContainer';
import GridContext from '../context/GridContext';
import QueryAppContextInterface, { DataItem } from '../context/QueryAppContextInterface';

export interface FluidQueryAppWidgetProps {
	isEditingFilters: boolean;

	setEditingFilters(value: boolean): void;
}

export function getPropertiesFromGridContext(inject: GridContext, properties: GridProps): Partial<GridProps> {
	return {
		context: inject,
	};
}

export function getPropertiesFromAppContext(inject: QueryAppContextInterface, properties: GridProps): Partial<GridProps> {
	const {datastoreData, datastoreDataLoadingStatus, changeCellValue} = inject;
	const rowRows = {
		rows: datastoreData.map((item: DataItem, index: number) => {
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

export const contextReducers = {
	'gridContext': getPropertiesFromGridContext,
	'queryAppContext': getPropertiesFromAppContext
};

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
				w(GridContainer, {contextReducers: {
						'gridContext': getPropertiesFromGridContext,
						'queryAppContext': getPropertiesFromAppContext
					}}),
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
