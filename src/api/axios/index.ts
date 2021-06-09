import axiosPackage from 'axios';
import {withMockServer} from '../mock';

export const baseURL = 'http://test.test/';

export const axios = withMockServer(
  axiosPackage.create({
    baseURL,
  })
);
