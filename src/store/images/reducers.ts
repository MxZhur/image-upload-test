import {ImagesState, ImagesAction, Image} from './types';

const initialState: ImagesState = [];

export function imagesReducer(
  state: ImagesState = initialState,
  action: ImagesAction,
) {
  switch (action.type) {
    default:
      return state;
  }
}
