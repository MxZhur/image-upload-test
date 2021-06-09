import { ImagePreviewData } from "./types";

export const appendImagesAction = (images: ImagePreviewData[]) =>
  <const>{
    type: 'APPEND_IMAGES',
    images,
  };
