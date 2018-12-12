import renderer from '@dojo/framework/widget-core/vdom';
import {w} from '@dojo/framework/widget-core/d';
import Grid from './widgets/grid/Grid';

const columns = [
    {
        id: '1',
        field: 'id'
    },
    {
        id: '2',
        field: 'name'
    },
    {
        id: '3',
        field: 'age'
    },
];
const items = [
    {
        id: 'id',
        data: {
            id: 1123,
            name: 'Bob',
            age: 24
        }
    },
    {
        id: 'id',
        data: {
            id: 1125,
            name: 'Bob',
            age: 34
        },
    },
    {
        id: 'id',
        data: {
            id: 568675855678,
            name: 'Bob',
            age: 54
        },
    },
    {
        id: 'id',
        data: {
            id: 8906890,
            name: 'Bob',
            age: 64
        },
    },
];
const r = renderer(() => w(Grid, {columns, items}));
r.mount();
