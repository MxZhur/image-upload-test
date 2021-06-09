import {AxiosInstance} from 'axios';
import MockAdapter from 'axios-mock-adapter';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import {ImageType, UploadPhotosResponse} from '../photos/types';

export const withMockServer = (axiosInstance: AxiosInstance) => {
  var mock = new MockAdapter(axiosInstance);

  mock.onPost('/upload').reply(config => {
    const data = JSON.parse(config.data);

    if (!data || !data.photos) {
      return [400, '[]'];
    }

    const response: UploadPhotosResponse = {
      result: 'OK',
      images: data.photos.map((item: ImageType) => ({
        id: nanoid(),
        uri: item.uri,
      })),
    };
    return [200, JSON.stringify(response)];
  });

  return axiosInstance;
};
