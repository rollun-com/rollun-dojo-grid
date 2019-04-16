import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { CellEditorProps } from './CellEditor';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { w } from '@dojo/framework/widget-core/d';
import Calendar from '@dojo/widgets/calendar';
import dojoTheme  from '@dojo/themes/dojo';

export default class CalendarEditor extends WidgetBase<CellEditorProps> {

	protected render(): DNode {
		const selectedDate = new Date(this.properties.value);
		const {onCellValueUpdate, rowIndex, columnIndex, onStopEditing} = this.properties;
		const onDateSelect = (date: Date) => {
			onCellValueUpdate(rowIndex, columnIndex, String(date.getTime()));
			onStopEditing();
		};
		return w(Calendar, {
			theme: dojoTheme,
			selectedDate,
			onDateSelect
		});
	}
}
