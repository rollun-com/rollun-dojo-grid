import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { Constructor, RegistryLabel, DNode } from '@dojo/framework/widget-core/interfaces';
import { GetProperties, inject } from '@dojo/framework/widget-core/decorators/inject';
import { w } from '@dojo/framework/widget-core/d';
import beforeProperties from '@dojo/framework/widget-core/decorators/beforeProperties';

export type RuntimeContextContainer<T extends WidgetBase> =
	Constructor<WidgetBase<Partial<T['properties']> & RuntimeContextContainerProps>>;

export interface RuntimeContextContainerProps {
	contextName: RegistryLabel;
}

export function RuntimeContextContainer<W extends WidgetBase>(
	component: Constructor<W> | RegistryLabel,
	{getProperties}: { getProperties: GetProperties }
): RuntimeContextContainer<W> {
	class InjectProviderWidget extends WidgetBase<Partial<W['properties']> & RuntimeContextContainerProps> {
		protected render(): DNode {
			const {contextName} = this.properties;

			class WidgetContainer extends WidgetBase<Partial<W['properties']>> {
				constructor() {
					super();
					beforeProperties(
						function (this: WidgetBase) {
							this.invalidate();
						}
					)(this);
					inject(
						{
							name: contextName,
							getProperties: getProperties
						}
					)(this);
				}

				protected render(): DNode {
					return w(component, this.properties, this.children);
				}
			}

			return w(WidgetContainer, this.properties);
		}
	}

	return InjectProviderWidget;
}

export default RuntimeContextContainer;
