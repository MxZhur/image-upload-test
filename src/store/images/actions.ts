import {ImagePreviewData} from './types';

export const setImagesAction = (images: ImagePreviewData[]) =>
  <const>{
    type: 'SET_IMAGES',
    images,
  };
