export default class AppContext {
	private _invalidator: () => void;
	private _gridValues: {}[];

	constructor(invalidator: () => void, initialState: { values: string[][] }) {
		this._invalidator = invalidator;
		this._gridValues = initialState.values;
		console.log('initial grid values', initialState.values);
	}

	get gridValues(): {}[] {
		return this._gridValues;
	}

	set gridValues(gridValues: {}[]) {
		this._gridValues = gridValues;
		this._invalidator();
	}

	changeValue(rowIndex: number, cellIndex: number, value: string) {
		if (this._gridValues[rowIndex] !== undefined && this._gridValues[rowIndex][cellIndex] !== undefined) {
			this._gridValues[rowIndex][cellIndex] = value;
			this._invalidator();
		} else {
			throw new Error(` Value in ${rowIndex} ${cellIndex} doesn't exist`);
		}
	}

	addRow(row: string[]) {
		this._gridValues.push(row);
		this._invalidator();
	}
}
