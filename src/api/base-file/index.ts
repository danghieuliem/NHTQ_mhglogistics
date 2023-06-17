import { UploadFile } from 'antd/lib/upload/interface';
import FormData from 'form-data';
import BaseAPI from '../methods';

const { post } = new BaseAPI('file');

export const baseFile = {
	uploadFile: (data: UploadFile) => {
		let frmData = new FormData();
		frmData.append('file', data);
		return post<string>('/upload-file', frmData, {
			headers: {
				['Content-Type']: 'multipart/form-data'
			}
		});
	},

	uploadMultipleFiles: (data: UploadFile[]) => {
		let frmData = new FormData();

		data.forEach((item) => frmData.append('files', item));

		return post<string[]>('/upload-multiple-files', frmData, {
			headers: { ['Content-Type']: 'multipart/form-data' }
		});
	}
};
