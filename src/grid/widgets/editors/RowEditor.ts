/*
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { ColumnInfo } from '../../../common/interfaces';
import { v, w } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import TextInput from '@dojo/widgets/text-input';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';
import * as fa from 'rollun-common/dist/css/fontawesome.m.css';
import * as faSolid from 'rollun-common/dist/css/solid.m.css';
import * as ownCss from './rowEditor.m.css';

export interface RowEditorProps {
	columns: ColumnInfo[];
	item: {};

	editorRenderer?(column: ColumnInfo, value: string, state: {}): DNode;

	onItemUpdate(item: {}): void;

	onUpdateCancel(): void;
}

export default class RowEditor extends WidgetBase<RowEditorProps> {
	private isStarted = false;
	private state = {};

	protected render(): DNode[] {
		const {columns, item} = this.properties;
		if (!this.isStarted) {
			this.state = item;
			if (document.onkeyup) {// FIXME: implement open editor managing
				document.onkeyup(new KeyboardEvent('keyup', {code: 'Escape'}));
			}
			this.isStarted = true;
		}
		document.onkeyup = (event: KeyboardEvent) => {
			switch (event.code) {
				case 'Enter':
					this.finishEditing();
					break;
				case 'Escape':
					this.cancelEditing();
					break;
			}
		};
		return [
			v('button',
				{
					classes: `${bs.btn}  ${bs.btnSuccess} ${bs.btnSm} ${bs.positionRelative}  ${bs.floatLeft} ${ownCss.controlBtn}`,
					onclick: () => {
						this.finishEditing();
					}
				},
				[
					v('i', {classes: `${faSolid.fas} ${fa.faCheck} `})
				]
			),
			v('button',
				{
					classes: `${bs.btn} ${bs.btnDanger} ${bs.btnSm} ${bs.positionRelative}  ${bs.floatLeft} ${ownCss.controlBtn}`,
					onclick: () => {
						this.cancelEditing();
					}
				},
				[
					v('i', {classes: `${faSolid.fas} ${fa.faBan}`})
				]
			),
			...columns.map((column) => {
				return this.renderEditor(column, this.state[column.field]);
			})
		];
	}

	private finishEditing(): void {
		const newItem = Object.assign({}, this.state);
		this.properties.onItemUpdate(newItem);
		document.onkeyup = () => {
		};
	}

	private cancelEditing(): void {
		this.properties.onUpdateCancel();
		document.onkeyup = () => {
		};
	}

	private renderEditor(column: ColumnInfo, value: string): DNode {
		if (this.properties.editorRenderer) {
			return this.properties.editorRenderer(column, value, this.state);
		}
		return v('div',
			{classes: `${bs.dFlex} ${bs.p1}  ${bs.flexGrow1}`},
			[
				w(TextInput, {
					extraClasses: {
						root: `${bs.w100}`,
						inputWrapper: `${bs.w100}`,
						input: `${bs.w100}`,
					},
					value,
					onInput: (value: string): void => {
						this.state[column.field] = value;
						this.invalidate();
					}
				})
			]
		);
	}
}
*/
