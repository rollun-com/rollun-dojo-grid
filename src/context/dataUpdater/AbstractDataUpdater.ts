import { LoadingStatusEnum } from '../../common/interfaces';

export default abstract class AbstractDataUpdater<T> {

	protected _loadingStatus: LoadingStatusEnum;
	protected _data: T;

	get loadingStatus(): LoadingStatusEnum {
		return this._loadingStatus;
	}

	get data(): T {
		return this._data;
	}

	protected abstract _updateData(): Promise<any>;

	updateData(): Promise<any> {
		this._loadingStatus = LoadingStatusEnum.loading;
		return new Promise((resolve, reject) => {
			this._updateData().then(
				(data) => {
					this._data = <T> this.afterProcess(data);
					this._loadingStatus = LoadingStatusEnum.loaded;
					resolve();
				},
				(error) => {
					this._loadingStatus = LoadingStatusEnum.error;
					reject(error);
				}
			);
		});
	}

	protected afterProcess(data) {
		return data;
	}
}
