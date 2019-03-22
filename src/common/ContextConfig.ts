export default class ContextConfig {
	protected _ownContextClass: any;
	protected _childWidgetClasses: any[];

	constructor(ownContextClass: any, childWidgetClasses: any[]) {
		this._ownContextClass = ownContextClass;
		this._childWidgetClasses = childWidgetClasses;
	}

	getContextClasses() {
		const contextClasses: any[] = [this._ownContextClass];
		this._childWidgetClasses.forEach((widgetClass) => {
			if (widgetClass.contextConfig) {
				contextClasses.push(widgetClass.contextConfig.getContextClasses());
			}
		});
		// @ts-ignore
		return contextClasses.flat();
	}
}
