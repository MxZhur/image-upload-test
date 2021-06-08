import {ImageFormFieldsAdd, ImageFormFieldsUpdate} from './types';

export const addImageAction = (formData: ImageFormFieldsAdd) =>
  <const>{
    type: 'ADD_IMAGE',
    formData,
  };

export const updateImageAction = (
  id: string,
  formData: ImageFormFieldsUpdate,
) =>
  <const>{
    type: 'UPDATE_IMAGE',
    id,
    formData,
  };

export const deleteImageAction = (id: string) =>
  <const>{
    type: 'DELETE_IMAGE',
    id,
  };
