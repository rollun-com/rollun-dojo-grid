import RqlQueryManager from "../../src/RqlQueryManager";
import Select from 'rollun-ts-rql/dist/nodes/Select';
import Query from 'rollun-ts-rql/dist/Query';
import And from 'rollun-ts-rql/dist/nodes/logicalNodes/And';
import Eq from 'rollun-ts-rql/dist/nodes/scalarNodes/Eq';
import Le from 'rollun-ts-rql/dist/nodes/scalarNodes/Le';
import Ge from 'rollun-ts-rql/dist/nodes/scalarNodes/Ge';
import QueryStringifier from 'rollun-ts-rql/dist/QueryStringifier';

const manager = new RqlQueryManager(new Query({
    select: new Select(['id', 'name', 'age'])
}));
const equery = new Eq('id', '1233e');
const andQuery = new And([new Le('age', 45), new Ge('age', 18)]);

manager.appendQuery(equery);
const checkOne = manager.getQuery();
const properCheckOne = new Query({query: equery, select: new Select(['id', 'name', 'age'])});
console.log(JSON.stringify(checkOne, null, 2));
console.log(QueryStringifier.stringify(checkOne));
console.log(JSON.stringify(properCheckOne, null, 2));
console.log(QueryStringifier.stringify(properCheckOne));
manager.appendQuery(andQuery);
const chekTwo = manager.getQuery();
console.log(JSON.stringify(chekTwo, null, 2));
console.log(QueryStringifier.stringify(chekTwo));
