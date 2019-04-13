import inject, { GetProperties } from '@dojo/framework/widget-core/decorators/inject';
import { DNode, Constructor, RegistryLabel } from '@dojo/framework/widget-core/interfaces';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import alwaysRender from '@dojo/framework/widget-core/decorators/alwaysRender';
import { w } from '@dojo/framework/widget-core/d';

export type RenderInjectionContainer<T extends WidgetBase> =
	Constructor<WidgetBase<Partial<T['properties'] & RenderInjectionContainerProps>>>;

export interface RenderInjectionContainerProps {
	contextName: RegistryLabel;
}

export function RenderInjectionContainer<W extends WidgetBase>(
	component: Constructor<W> | RegistryLabel,
	{ getProperties }: { getProperties: GetProperties }
): RenderInjectionContainer<W> {
	@alwaysRender()
	class WidgetContainer extends WidgetBase<Partial<W['properties'] & RenderInjectionContainerProps>> {
		private isStarted: boolean;
		protected render(): DNode {
			if (!this.isStarted) {
				this.isStarted = true;
				const {contextName} = this.properties;
				inject(
					{
						name: contextName,
						getProperties
					}
				)(this);
				setTimeout(() => {this.invalidate(); }, 1);
				return null;
			}
			return w(component, this.properties, this.children);
		}
	}
	return WidgetContainer;
}

export default RenderInjectionContainer;
