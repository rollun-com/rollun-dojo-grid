export interface DialogStatus {
	shown: boolean;
}

export default class DialogController {
	private _dialogs: Map<string, DialogStatus>;
	private _invalidator: () => void;

	constructor(invalidator: () => void, initialStatus: {[key: string]: DialogStatus}) {
		this._invalidator = invalidator;
		this._dialogs = new Map(Object.entries(initialStatus));
	}

	show(dialogId: string) {
		const currentStatus = this._dialogs.get(dialogId);
		if (currentStatus) {
			currentStatus.shown = true;
			this._dialogs.set(dialogId, currentStatus);
			this._invalidator();
		}
	}

	hide(dialogId: string) {
		const currentStatus = this._dialogs.get(dialogId);
		if (currentStatus) {
			currentStatus.shown = false;
			this._dialogs.set(dialogId, currentStatus);
			this._invalidator();
		}
	}

	has(dialogId: string): boolean {
		return this._dialogs.has(dialogId);
	}

	get(dialogId: string): DialogStatus {
		return this._dialogs.get(dialogId);

	}

	set(dialogId: string, status: DialogStatus) {
		this._dialogs.set(dialogId, status);
		this._invalidator();
	}
}
