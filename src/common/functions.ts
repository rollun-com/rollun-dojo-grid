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

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
	baseCtors.forEach(baseCtor => {
		Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
			derivedCtor.prototype[name] = baseCtor.prototype[name];
		});
	});
}
