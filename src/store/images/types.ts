import {appendImagesAction, refreshImagesAction} from './actions';

export type ImagesAction =
  | ReturnType<typeof appendImagesAction>
  | ReturnType<typeof refreshImagesAction>;

export type ImagesState = string[];
