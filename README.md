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

## Basic usage
#### Render an array of data
```typescript
import renderer from '@dojo/framework/widget-core/vdom';
import { w } from '@dojo/framework/widget-core/d';
import Grid from "rollun-ts-grid/dist/all/grid";

const columns = [
	{id: 1, name: 'Bob', age: 21},
	{id: 2, name: 'Alex', age: 25},
	{id: 3, name: 'Veronica', age: 20},
];

const items = [
	{field: 'id', label: 'Identifier'}, //if label is specified, it will be shown in column header
	{field: 'name'},
	{field: 'age'},
];


const r = renderer(() => w(Grid, {columns, items}));
r.mount();
```
#### Render datastore contents
```
import renderer from '@dojo/framework/widget-core/vdom';
import { w } from '@dojo/framework/widget-core/d';
import HttpDatastore from "rollun-ts-datastore/dist/HttpDatastore";
import GridComposite from "rollun-ts-grid/dist/all/grid-composite/Composite";

const store = new HttpDatastore('my/users/datastore');

const r = renderer(() => w(GridComposite, {store}));
r.mount();
```
