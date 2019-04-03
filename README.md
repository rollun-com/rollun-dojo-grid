# rollun-ts-grid

Brand new rollun grid made using [Dojo](https://dojo.io/).

## Installation
preferred way to install this library is via npm. Run
```
npm install rollun-ts-grid
```
or add
```
"rollun-ts-grid": "*",
```
to the dependencies section of your package.json

## Usage
### Basic usage
```typescript
import renderer from '@dojo/framework/widget-core/vdom';
import { w } from '@dojo/framework/widget-core/d';
import { Registry } from '@dojo/framework/widget-core/Registry';
import GridContext from 'rollun-ts-grid/dist/all/context/GridContext';
import Grid from 'rollun-ts-grid/dist/all/gridWidgets/grid';
import { RowRows, RowFields } from 'rollun-ts-grid/dist/all/common/interfaces';

const rowRows: RowRows = {
	rows: [
		{
			id: 0,
			cells: [
				{value: '1'},
				{value: '2'},
				{value: '3'},
				{value: '4'},
			]
		},
		{
			id: 1,
			cells: [
				{value: '1'},
				{value: '2'},
				{value: '3'},
				{value: '4'},
			]
		},
		{
			id: 2,
			cells: [
				{value: '1'},
				{value: '2'},
				{value: '3'},
				{value: '4'},
			]
		},
		{
			id: 3,
			cells: [
				{value: '1'},
				{value: '2'},
				{value: '3'},
				{value: '4'},
			]
		},
		{
			id: 4,
			cells: [
				{value: '1'},
				{value: '2'},
				{value: '3'},
				{value: '4'},
			]
		},
	]
};
const rowFields: RowFields = {
	fieldsInfo: [
		{name: 'A'},
		{name: 'B'},
		{name: 'C'},
		{name: 'D'},
	]
};
let gridContext: GridContext;
const registry = new Registry();
registry.defineInjector('gridContext',
	(invalidator: () => void) => {
		gridContext = new GridContext(invalidator, {
			rows: rowRows,
			fields: rowFields
		});
		return () => gridContext;
	}
);
const r = renderer(() => w(Grid, {context: gridContext}));
r.mount({
	registry
});
```
Code above renders a 4x4 grid

### Render QueryApp
```typescript

```
