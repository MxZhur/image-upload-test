import React, {useState} from 'react';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {Alert, Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import ImageCropPicker, {Image} from 'react-native-image-crop-picker';
import {uploadPhotos} from '../../api/photos';
import {ImageRequestData} from '../../api/photos/types';
import {ImageThumbnail} from '../../components';
import {store} from '../../store';
import {setImagesAction} from '../../store/images/actions';

const NUMBER_OF_IMAGES = 2;

export interface UploadPhotosFormValues {
  photos: (ImageRequestData | null)[];
}

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
    clearErrors,
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

  const watchPhotos = watch('photos');

  const onSubmit = async (data: UploadPhotosFormValues) => {
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
              }).then(image => {
                setImage(index, image);
              });
            },
          },
          {
            text: 'Gallery',
            style: 'default',
            onPress: () => {
              ImageCropPicker.openPicker({
                mediaType: 'photo',
              }).then(image => {
                setImage(index, image);
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
    <View style={styles.uploadForm}>
      <Text style={styles.text}>{`Upload ${NUMBER_OF_IMAGES} file(s)`}</Text>
      <ScrollView
        contentContainerStyle={{
          marginBottom: 10,
          // flex: 1,
          // justifyContent: 'space-between',
          alignItems: 'center',
        }}
        horizontal={true}
        fadingEdgeLength={60}>
        {images.map((image, index) => {
          const formImage = formPhotos[index] ?? null;

          return (
            <Controller
              defaultValue={fields}
              control={control}
              name={`photos.${index}`}
              key={index}
              rules={{
                required: true,
                min: NUMBER_OF_IMAGES,
                max: NUMBER_OF_IMAGES,
                validate: {
                  isArrayFull,
                },
              }}
              render={() => (
                <View
                  style={{
                    marginHorizontal: 3,
                  }}>
                  <ImageThumbnail
                    key={index.toString()}
                    size={55}
                    src={formImage?.uri}
                    onPress={() => {
                      if (!loading) {
                        openPicker(index);
                      }
                    }}
                  />
                </View>
              )}
            />
          );
        })}
      </ScrollView>
      <Text style={[styles.text, styles.textError]}>
        {errors.photos
          ? `You have to upload all ${NUMBER_OF_IMAGES} images.`
          : ''}
      </Text>
      <View style={styles.submitButton}>
        <Button
          title={'Upload'}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  uploadForm: {
    padding: 10,
    minHeight: 125,
    backgroundColor: 'white',
    elevation: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  text: {
    marginVertical: 5,
  },
  textError: {
    color: 'red',
  },
  submitButton: {
    alignSelf: 'stretch',
  },
});
