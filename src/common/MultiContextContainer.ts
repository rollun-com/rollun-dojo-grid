import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { inject, GetProperties } from '@dojo/framework/widget-core/decorators/inject';
import { Constructor, DNode, RegistryLabel } from '@dojo/framework/widget-core/interfaces';
import { w } from '@dojo/framework/widget-core/d';
import { alwaysRender } from '@dojo/framework/widget-core/decorators/alwaysRender';

export interface ContextReducers {
	[name: string]: GetProperties;
}

export type MultiContextContainer<T extends WidgetBase> = Constructor<WidgetBase<Partial<T['properties']>>>;

export function MultiContextContainer<W extends WidgetBase>
(
	component: Constructor<W> | RegistryLabel,
	contextReducers: ContextReducers
):
	MultiContextContainer<W> {
	@alwaysRender()
	class WidgetContainer extends WidgetBase<Partial<W['properties']>> {
		constructor() {
			super();
			Object.keys(contextReducers).forEach((contextName: string) => {
				inject(
					{
						name: contextName,
						getProperties: contextReducers[contextName]
					}
				)(this);
			});
		}

		protected render(): DNode {
			return w(component, this.properties, this.children);
		}
	}

	return WidgetContainer;
}

export default MultiContextContainer;
