import GridContext from '../../context/GridContext';
import { Grid, GridProps } from '../../gridWidgets/grid/widgets/Grid';
import { FieldInfo } from '../../common/interfaces';
import MultiContextContainer from '../../common/MultiContextContainer';
import FilterEditorAppContext from '../../context/FilterEditorAppContext';

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
const FilterGridContainer: MultiContextContainer<Grid> = MultiContextContainer(Grid, contextReducers);

export default FilterGridContainer;
