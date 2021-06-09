import {axios} from '../axios';
import {UploadPhotosPayload, UploadPhotosResponse} from './types';

export const uploadPhotos = (payload: UploadPhotosPayload) => {
  return axios.post<UploadPhotosResponse>('upload', payload, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};
