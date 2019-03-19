import Container from '@dojo/framework/widget-core/Container';
import QueryEditorContext from '../../context/QueryEditorContext';
import PossibleNodeFields, { PossibleNodeFieldsProps } from '../../queryEditor/possibleNodeFields/PossibleNodeFields';

function getProperties(inject: QueryEditorContext, properties: Partial<PossibleNodeFieldsProps>): PossibleNodeFieldsProps {
	return {
		fieldNames: inject.fieldNames
	};
}

const PossibleNodeFieldsContainer: Container<PossibleNodeFields> = Container(PossibleNodeFields, 'queryEditorContext', {getProperties});

export default PossibleNodeFieldsContainer;
