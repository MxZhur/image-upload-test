/* eslint-disable camelcase */
import {
  addImageAction,
  updateImageAction,
  deleteImageAction,
} from './actions';

export type ImagesAction =
  | ReturnType<typeof addImageAction>
  | ReturnType<typeof updateImageAction>
  | ReturnType<typeof deleteImageAction>;

export type ImagesState = Image[];

export type Image = {
  id: string;
  name: string;
  timezone: string|null;
  image?: string|null;
  note?: string;
};

export type ImageFormFieldsAdd = {
  name: string;
  timezone: string;
  note?: string;
};

export type ImageFormFieldsUpdate = {
  name?: string;
  timezone?: string;
  note?: string;
};

export type Language = {
  code: string;
  name_long: string;
  name_short: string;
};
