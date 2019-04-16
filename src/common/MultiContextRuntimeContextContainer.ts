import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { inject, GetProperties } from '@dojo/framework/widget-core/decorators/inject';
import { Constructor, DNode, RegistryLabel } from '@dojo/framework/widget-core/interfaces';
import { w } from '@dojo/framework/widget-core/d';
import beforeProperties from '@dojo/framework/widget-core/decorators/beforeProperties';

export interface ContextReducers {
	[name: string]: GetProperties;
}

export interface MultiContextRuntimeContextContainerProps {
	contextReducers: ContextReducers;
}

export type MultiContextRuntimeContextContainer<T extends WidgetBase> =
	Constructor<WidgetBase<Partial<T['properties'] & MultiContextRuntimeContextContainerProps>>>;

export function MultiContextRuntimeContextContainer<W extends WidgetBase>
(
	component: Constructor<W> | RegistryLabel,
):
	MultiContextRuntimeContextContainer<W> {
	class InjectProviderWidget extends WidgetBase<Partial<W['properties']> & MultiContextRuntimeContextContainerProps> {
		protected render(): DNode {
			const {contextReducers} = this.properties;

			class WidgetContainer extends WidgetBase<Partial<W['properties']>> {
				constructor() {
					super();
					beforeProperties(
						function (this: WidgetBase) {
							this.invalidate();
						}
						)(this);
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

			return w(WidgetContainer, this.properties);
		}
	}

	return InjectProviderWidget;
}

export default MultiContextRuntimeContextContainer;
