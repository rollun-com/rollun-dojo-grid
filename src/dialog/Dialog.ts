import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { v } from '@dojo/framework/widget-core/d';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';

export interface DialogProps {
	isOpen: boolean;
	onClose: () => void;
	onOk?: () => void;
	title?: string;
	options?: {
		size?: (1 | 2 | 3 | 4);
		centered?: boolean;
	};
}

export default class Dialog extends WidgetBase<DialogProps> {

	protected render(): DNode | DNode[] {
		const title = this.properties.title;
		const onOk = this.properties.onOk
			? (event: MouseEvent) => {
				// @ts-ignore
				this.properties.onOk();
			}
			: (event: MouseEvent) => {
			};
		const onClose = this.properties.onClose;
		const modalSizeClass = this.getModalSize();
		const centered = (this.properties.options && this.properties.options.centered);
		return this.properties.isOpen
			? [
				v('div',
					{
						classes: `${bs.modal} ${bs.fade} ${bs.show} ${bs.dBlock}`,
						tabIndex: -1,
						role: 'dialog',
					},
					[
						v('div',
							{
								classes: `${bs.modalDialog} ${modalSizeClass} ${centered ? bs.modalDialogCentered : ''}`,
								role: 'document',
							},
							[
								v('div',
									{classes: bs.modalContent},
									[
										v('div',
											{classes: bs.modalHeader},
											[
												v('h5',
													{classes: bs.modalTitle},
													[
														title
													]
												),
												v('button',
													{
														classes: bs.close,
														onclick: onClose
													},
													[
														v('span',
															{ariaHidden: true},
															[
																'×'
															]
														)
													]
												)
											]
										),
										v('div',
											{classes: bs.modalBody},
											this.children
										),
										v('div',
											{classes: `${bs.modalFooter} ${this.properties.onOk ? '' : bs.dNone}`},
											[
												v('button',
													{
														classes: `${bs.btn} ${bs.btnPrimary} ${bs.btnSm} `,
														onclick: onOk

													},
													['OK']
												)
											]
										)
									]
								)
							]
						)
					]
				),
				v('div', {classes: `${bs.show} ${bs.modalBackdrop}`}),
			]
			: null;
	}

	protected getModalSize() {
		const classMap = [bs.modalSm, '', bs.modalLg, bs.modalXl];
		const sizeFlag = this.properties.options ? this.properties.options.size : 2;
		// @ts-ignore
		return classMap[(sizeFlag - 1)];
	}
}
