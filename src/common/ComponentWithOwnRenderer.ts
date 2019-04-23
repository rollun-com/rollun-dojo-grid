import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import {Constructor, RegistryLabel, DNode} from '@dojo/framework/widget-core/interfaces';
import {v, w} from '@dojo/framework/widget-core/d';
import Registry from '@dojo/framework/widget-core/Registry';
import renderer from '@dojo/framework/widget-core/vdom';
import EventedValue, {EventedValueEventTypes} from './EventedValue';

export type ComponentWithOwnRenderer<T extends WidgetBase> = Constructor<WidgetBase<Partial<T['properties']>>>;

function getRandomId(): string {
    return String(Math.round(Math.random() * 100000000));
}

export interface ContextWithDelayedInvalidator {
    invalidator: () => void;
}

export function createComponentWithOwnRenderer<T extends WidgetBase>(
    component: Constructor<T> | RegistryLabel,
    ownContext: ContextWithDelayedInvalidator
): ComponentWithOwnRenderer<T> {
    class WidgetWithRenderer extends WidgetBase<Partial<T['properties']>> {
        private nodeId: string;

        constructor() {
            super();
            this.nodeId = getRandomId();
        }

        protected render(): DNode {
            return v('div', {
                id: this.nodeId
            });
        }

        onAttach() {
            const ownRegistry = new Registry();
            ownRegistry.defineInjector('ownContext', (invalidator: () => void) => {
                ownContext.invalidator = invalidator;
                return () => ownContext;
            });
            const ownRenderer = renderer(() => w(component, {key: getRandomId()}));
            ownRenderer.mount({
                registry: ownRegistry, domNode: document.getElementById(this.nodeId) as HTMLElement
            });
        }
    }

    return WidgetWithRenderer;
}

function dr<T extends WidgetBase>(
    component: Constructor<T> | RegistryLabel,
    dynamicArgs: { [key: string]: EventedValue<any> },
    handlers: { [key: string]: (value: any) => void } = {},
    staticArgs: { [key: string]: any } = {}
) {
    const context = <ContextWithDelayedInvalidator>{...handlers, ...staticArgs};
    Object.keys(dynamicArgs).forEach((key: string) => {
        const observable = dynamicArgs[key];
        // @ts-ignore
        context[key] = <EventedValue<any>>observable;
        observable.on(EventedValueEventTypes.update, () => {
            context.invalidator();
        })
    });
    return createComponentWithOwnRenderer(component, context)
}

export default dr;
