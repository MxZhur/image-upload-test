/* eslint-disable camelcase */
import {appReducers} from './app/reducers';
import {ImagesState} from './images/types';

export type Store = ReturnType<typeof appReducers>;

export type RootState = {
  images: ImagesState;
};
