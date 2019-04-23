import Evented from '@dojo/framework/core/Evented';

export enum EventedValueEventTypes {
    update = 'update'
}

export type UpdateStrategy<T> = (ownValue: T, dependentValue: T) => T;

export default class EventedValue<T> extends Evented {
    private _value: T;
    private updateStrategy: UpdateStrategy<T> = (ownValue: T, dependentValue: T) => dependentValue;

    constructor(value: T | EventedValue<T>, updateStrategy?: UpdateStrategy<T>) {
        super();

        if (value instanceof EventedValue) {
            if (updateStrategy) {
                this.updateStrategy = updateStrategy
            }
            this._value = value.value;
            value.on(EventedValueEventTypes.update, (event: any) => {
                this.value = this.updateStrategy(this.value, event.value)
            })
        } else {
            this._value = value
        }
    }

    get value(): T {
        return this._value;
    }

    set value(value: T) {
        this._value = value;
        this.emit({type: EventedValueEventTypes.update, value: this.value})
    }

}
