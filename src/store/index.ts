import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import {appReducers} from './app/reducers';

export const store = createStore(appReducers, undefined, composeWithDevTools());
