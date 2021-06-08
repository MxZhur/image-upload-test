import {ImagesState, ImagesAction} from './types';

const initialState: ImagesState = [];

export function imagesReducer(
  state: ImagesState = initialState,
  action: ImagesAction,
) {
  switch (action.type) {
    case 'APPEND_IMAGES':
      return [...state, ...action.urls];
    case 'REFRESH_IMAGES':
      return action.urls;
    default:
      return state;
  }
}
