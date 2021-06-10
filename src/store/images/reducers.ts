import {ImagesState, ImagesAction} from './types';

const initialState: ImagesState = [];

export function imagesReducer(
  state: ImagesState = initialState,
  action: ImagesAction,
) {
  switch (action.type) {
    case 'SET_IMAGES':
      return [...action.images];
    default:
      return state;
  }
}
