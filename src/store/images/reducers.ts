import {ImagesState, ImagesAction} from './types';

const initialState: ImagesState = [];

export function imagesReducer(
  state: ImagesState = initialState,
  action: ImagesAction,
) {
  switch (action.type) {
    case 'APPEND_IMAGES':
      return [...state, ...action.images];
    default:
      return state;
  }
}
