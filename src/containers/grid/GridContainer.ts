import GridContext from '../../context/GridContext';
import { Grid, GridProps } from '../../gridWidgets/grid/widgets/Grid';
import AppContextInterface, { DataItem } from '../../context/AppContextInterface';
import { FieldInfo } from '../../common/interfaces';
import MultiContextContainer from '../MultiContextContainer';

function getPropertiesFromGridContext(inject: GridContext, properties: GridProps): Partial<GridProps> {
	return {
		context: inject,
	};
}

function getPropertiesFromAppContext(inject: AppContextInterface, properties: GridProps): Partial<GridProps> {
	const {datastoreData, datastoreDataLoadingStatus, changeDataItem} = inject;
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
		changeCellValue: changeDataItem.bind(inject)
	};
}

const GridContainer: MultiContextContainer<Grid> = MultiContextContainer(Grid,
	{
		'gridContext': getPropertiesFromGridContext,
		'appContext': getPropertiesFromAppContext
	}
);

export default GridContainer;
