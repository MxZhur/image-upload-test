import {AxiosInstance} from 'axios';
import MockAdapter from 'axios-mock-adapter';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import {ImageRequestData, UploadPhotosResponse} from '../photos/types';
import {store} from '../../store';
import {ImagePreviewData} from '../../store/images/types';

export const withMockServer = (axiosInstance: AxiosInstance) => {
  var mock = new MockAdapter(axiosInstance);

  mock.onPost('/upload').reply(config => {
    // Gets the array of new images,
    // Returns the array of all the uploaded images altogether

    const data = JSON.parse(config.data);

    if (!data || !data.photos) {
      return [400, '[]'];
    }

    // Use the store's state as the "mock database" for testing purposes
    const images = store.getState().images;

    const response: UploadPhotosResponse = {
      result: 'OK',
      images: images.concat(
        data.photos.map(
          (item: ImageRequestData): ImagePreviewData => ({
            id: nanoid(),
            uri: item.uri,
          }),
        ),
      ),
    };
    return [200, JSON.stringify(response)];
  });

  return axiosInstance;
};
