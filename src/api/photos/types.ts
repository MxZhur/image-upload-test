export type ImageRequestData = {
  name: string;
  uri: string;
  type: string;
};

export type UploadPhotosPayload = {
  photos: ImageRequestData[];
};

export type UploadPhotosResponse = {
  result: string;
  images: {
    id: string;
    uri: string;
  }[];
};
