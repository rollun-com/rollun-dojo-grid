import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import {DNode} from '@dojo/framework/widget-core/interfaces';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';
import {tsx} from "@dojo/framework/widget-core/tsx";
import FluidForm, { FluidFormField } from './FluidForm';
import Dialog from '../dialog/Dialog';

export interface NewItemCreatorProps {
    fields: string[],

    onFormSubmit(data: {}): void;
}

export default class NewItemCreator extends WidgetBase<NewItemCreatorProps> {
    private openDialog = false;

    protected render(): DNode | DNode[] {
        const formConfig: FluidFormField[] = this.properties.fields.map((value) => {
            return {field: value};
        });
        const onFormSubmit = (data: {}) => {
            this.properties.onFormSubmit(data);
            this.openDialog = false;
            this.invalidate()
        };
        return (<div>
            <button
                class={`${bs.btn} ${bs.btnPrimary}`}
                onclick={
                    () => {
                        this.openDialog = true;
                        this.invalidate()
                    }
                }
            >
                Open form
            </button>
            <Dialog isOpen={this.openDialog}
                    onClose={
                        () => {
                            this.openDialog = false;
                            this.invalidate();
                        }
                    }
            options={{
                size: 2,
                centered: true
            }}
            >
                <FluidForm formConfig={formConfig} onFormSubmit={onFormSubmit}>

                </FluidForm>
            </Dialog>
        </div>)
    }
}
