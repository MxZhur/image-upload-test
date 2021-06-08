export const appendImagesAction = (urls: string[]) =>
  <const>{
    type: 'APPEND_IMAGES',
    urls,
  };

export const refreshImagesAction = (urls: string[]) =>
  <const>{
    type: 'REFRESH_IMAGES',
    urls,
  };
