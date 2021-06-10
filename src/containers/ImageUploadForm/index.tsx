import React, {useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import {Alert} from 'react-native';
import ImageCropPicker, {Image} from 'react-native-image-crop-picker';
import {uploadPhotos} from '../../api/photos';
import {ImageRequestData} from '../../api/photos/types';
import {store} from '../../store';
import {setImagesAction} from '../../store/images/actions';
import {UploadPhotosFormValues} from './types';
import {ImageUploadFormView} from './view';

const NUMBER_OF_IMAGES = 5;

// I don't know why it works like this.
// TypeScript says I should use (ImageRequestData | null)[],
// but in fact, the validation function passes (ImageRequestData | null)
const isArrayFull = (item: (ImageRequestData | null)[]) => {
  return item?.uri !== undefined && item?.uri !== null;
};

export const ImageUploadForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
    getValues,
    watch,
  } = useForm<UploadPhotosFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      photos: Array(NUMBER_OF_IMAGES).fill(null, 0, NUMBER_OF_IMAGES),
    },
  });
  const {fields} = useFieldArray({
    control,
    name: 'photos',
    shouldUnregister: true,
  });

  const watchPhotos = watch('photos'); // Necessary for thumbnails re-rendering

  const submit = async (data: UploadPhotosFormValues) => {
    setLoading(true);
    try {
      const response = await uploadPhotos({
        photos: data.photos.filter(
          item => item !== null && item.uri !== undefined,
        ) as ImageRequestData[],
      });

      const newPhotos = response.data.images;

      await store.dispatch(setImagesAction(newPhotos));
      setLoading(false);
    } catch (error) {
      console.warn('UploadPhoto error:', error);
      setLoading(false);
    }
  };

  const openPicker = (index: number) => {
    try {
      Alert.alert(
        'Select source',
        undefined,
        [
          {text: 'Cancel', style: 'cancel', onPress: () => {}},
          {
            text: 'Camera',
            style: 'default',
            onPress: () => {
              ImageCropPicker.openCamera({
                mediaType: 'photo',
              })
                .then(image => {
                  setImage(index, image);
                })
                .catch(error => {
                  if (error.code !== 'E_PICKER_CANCELLED') {
                    console.warn(error);
                    Alert.alert(
                      'Sorry, there was an issue attempting to get the image you selected. Please try again.',
                    );
                  }
                });
            },
          },
          {
            text: 'Gallery',
            style: 'default',
            onPress: () => {
              ImageCropPicker.openPicker({
                mediaType: 'photo',
              })
                .then(image => {
                  setImage(index, image);
                })
                .catch(error => {
                  if (error.code !== 'E_PICKER_CANCELLED') {
                    console.warn(error);
                    Alert.alert(
                      'Sorry, there was an issue attempting to get the image you selected. Please try again.',
                    );
                  }
                });
            },
          },
        ],
        {
          cancelable: true,
        },
      );
    } catch (error) {
      console.warn(error);
    }
  };

  const setImage = (index: number, image: Image) => {
    const photo = {
      name: image.filename || 'image.jpg',
      uri: image.path,
      type: image.mime,
    };

    setValue(`photos.${index}`, photo);
  };

  const images = fields.map((item, index) => ({
    id: item.id,
    uri: item.uri,
    name: item.name,
    type: item.type,
  })) as {
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];

  const formPhotos = getValues().photos;

  return (
    <ImageUploadFormView
      formData={{
        control,
        errors,
        formPhotos,
        fieldName: 'photos',
        imageFields: images,
        formFields: fields,
        customValidationRules: {
          isArrayFull,
        },
      }}
      loading={loading}
      onSubmit={handleSubmit(submit)}
      onThumbnailPress={index => {
        if (!loading) {
          openPicker(index);
        }
      }}
      slots={NUMBER_OF_IMAGES}
    />
  );
};
