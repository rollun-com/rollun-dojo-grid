import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { CellEditorProps } from './CellEditor';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { w, v } from '@dojo/framework/widget-core/d';
import Calendar from '@dojo/widgets/calendar';
import dojoTheme from '@dojo/themes/dojo';
import * as bs from 'rollun-common/dist/css/bootstrap.m.css';

export default class CalendarEditor extends WidgetBase<CellEditorProps> {
	private date: Date;
	private isStarted: boolean;

	protected render(): DNode {
		const {onCellValueUpdate, rowIndex, columnIndex, onStopEditing, value} = this.properties;
		if (!this.isStarted) {
			this.date = new Date(parseInt(value, 10) * 1000);
			this.isStarted = true;
		}
		const selectedDate = this.date;
		const onDateSelect = (date: Date) => {
			this.date = date;
			this.invalidate();
		};
		return v('div',
			{
				classes: `${bs.dFlex} ${bs.flexColumn} ${bs.bgWhite} ${bs.p2} ${bs.border}`,
				styles: {
					position: 'absolute',
					zIndex: '1',
					left: '50%',
				}
			},
			[
				w(Calendar, {
					theme: dojoTheme,
					selectedDate,
					onDateSelect
				}),
				v('button',
					{
						classes: `${bs.btn} ${bs.btnPrimary} ${bs.btnSm} ${bs.mt1}`,
						onclick: () => {
							onCellValueUpdate(rowIndex, columnIndex, String(this.date.getTime() / 1000));
							onStopEditing();
						}
					},
					['OK']
				)
			]
		);
	}
}
