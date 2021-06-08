import {combineReducers} from 'redux';

import {imagesReducer} from '../images/reducers';

export const appReducers = combineReducers({
  images: imagesReducer,
});
