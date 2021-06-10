import {setImagesAction} from './actions';

export type ImagesAction = ReturnType<typeof setImagesAction>;

export type ImagePreviewData = {
  id: string;
  uri: string;
}

export type ImagesState = ImagePreviewData[];
