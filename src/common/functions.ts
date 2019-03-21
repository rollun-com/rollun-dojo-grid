import * as lodash from 'lodash';

export function undefinedSafeDiffNode(previousProperty: any, newProperty: any) {
	if (newProperty) {
		return {
			changed: lodash.isEqual(previousProperty, newProperty),
			value: newProperty
		};
	} else {
		return {
			changed: false,
			value: previousProperty
		};
	}
}
