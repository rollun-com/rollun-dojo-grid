import renderer from '@dojo/framework/widget-core/vdom';
import {w} from '@dojo/framework/widget-core/d';
import Composite from "./widgets/Composite";
import HttpDatastore from "rollun-ts-datastore/dist/HttpDatastore"

const datastoreUrl = '/api/datastore/treeData_csv';
const store = new HttpDatastore(datastoreUrl);

const r = renderer(() => w(Composite, {store}));
r.mount();
