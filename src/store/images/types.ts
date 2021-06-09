import {appendImagesAction} from './actions';

export type ImagesAction = ReturnType<typeof appendImagesAction>;

export type ImagePreviewData = {
  id: string;
  uri: string;
}

export type ImagesState = ImagePreviewData[];
