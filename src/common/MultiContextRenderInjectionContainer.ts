import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { inject, GetProperties } from '@dojo/framework/widget-core/decorators/inject';
import { Constructor, DNode, RegistryLabel } from '@dojo/framework/widget-core/interfaces';
import { w } from '@dojo/framework/widget-core/d';
import { alwaysRender } from '@dojo/framework/widget-core/decorators/alwaysRender';

export interface ContextReducers {
	[name: string]: GetProperties;
}

export interface MultiContextRenderInjectionContainerProps {
	contextReducers: ContextReducers;
}

export type MultiContextRenderInjectionContainer<T extends WidgetBase> =
	Constructor<WidgetBase<Partial<T['properties'] & MultiContextRenderInjectionContainerProps>>>;

export function MultiContextRenderInjectionContainer<W extends WidgetBase>
(
	component: Constructor<W> | RegistryLabel,
):
	MultiContextRenderInjectionContainer<W> {
	@alwaysRender()
	class WidgetContainer extends WidgetBase<Partial<W['properties'] & MultiContextRenderInjectionContainerProps>> {
		private isStarted: boolean;

		protected render(): DNode {
			if (!this.isStarted) {
				this.isStarted = true;
				const {contextReducers} = this.properties;
				Object.keys(contextReducers).forEach((contextName: string) => {
					inject(
						{
							name: contextName,
							getProperties: contextReducers[contextName]
						}
					)(this);
				});
				setTimeout(() => {this.invalidate(); }, 1);
				return null;
			}
			return w(component, this.properties, this.children);
		}
	}

	return WidgetContainer;
}

export default MultiContextRenderInjectionContainer;
