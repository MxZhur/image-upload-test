import {ImageRequestData} from '../../api/photos/types';

export interface UploadPhotosFormValues {
  photos: (ImageRequestData | null)[];
}
