import {axios} from '../axios';
import {UploadPhotosPayload, UploadPhotosResponse} from './types';

export const uploadPhotos = (payload: UploadPhotosPayload) => {
  const bodyFormData = new FormData();

  payload.photos.forEach((photo, index) => {
    bodyFormData.append(`photos[${index}]`, photo);
  });

  return axios.post<UploadPhotosResponse>('upload', bodyFormData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};
