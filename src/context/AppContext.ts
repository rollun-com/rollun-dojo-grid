import GridContext from './GridContext';

export default class AppContext {
	private _invalidator: () => void;
	private _grid: GridContext;

	constructor(invalidator: () => void, initialState: { grid: GridContext }) {
		this._invalidator = invalidator;
		this._grid = initialState.grid;
	}

	get grid(): GridContext {
		return this._grid;
	}

	set grid(gridValues: GridContext) {
		this._grid = gridValues;
		this._invalidator();
	}
}
