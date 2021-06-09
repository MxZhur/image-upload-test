export type ImageType = {
  name: string;
  uri: string;
  type: string;
};

export type UploadPhotosPayload = {
  photos: (ImageType | null)[];
};

export type UploadPhotosResponse = {
  result: string;
  images: {
    id: string;
    uri: string;
  }[];
};
