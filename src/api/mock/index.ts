import {AxiosInstance} from 'axios';
import MockAdapter from 'axios-mock-adapter/types';
import {store} from '../../store';
import {appendImagesAction} from '../../store/images/actions';
import {ImageType} from '../photos/types';

export const withMockServer = (axiosInstance: AxiosInstance) => {
  var mock = new MockAdapter(axiosInstance);

  mock.onPost('/upload').reply(async config => {
    const data = JSON.parse(config.data);

    if (data.photos !== undefined) {
      return [400, '[]'];
    }

    const photoURLs: string[] = data.photos.map((item: ImageType) => item.uri);

    await store.dispatch(appendImagesAction(photoURLs));

    return [200, 'OK'];
  });

  return axiosInstance;
};
