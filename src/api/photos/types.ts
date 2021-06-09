export type ImageType = {
  name: string;
  uri: string;
  type: string;
};

export type UploadPhotosPayload = {
  text: string;
  photos: ImageType[];
};

export type UploadPhotosResponse = {
  result: string;
  data: string[]; // URLs
};
