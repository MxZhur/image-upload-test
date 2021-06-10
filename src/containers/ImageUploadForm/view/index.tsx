import React from 'react';
import {
  Control,
  Controller,
  DeepMap,
  FieldError,
  Validate,
} from 'react-hook-form';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {ImageRequestData} from '../../../api/photos/types';
import {ImageThumbnail} from '../../../components';
import {UploadPhotosFormValues} from '../types';

type Props = {
  loading: boolean;
  slots: number;
  formData: {
    fieldName: string;
    control: Control<UploadPhotosFormValues>;
    formFields: (ImageRequestData & Record<'id', string>)[];
    imageFields: {
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    formPhotos: (ImageRequestData | null)[];
    customValidationRules: Validate<any> | Record<string, Validate<any>>;
    errors: DeepMap<UploadPhotosFormValues, FieldError>;
  };
  onThumbnailPress: (index: number) => void;
  onSubmit: () => void;
};

export const ImageUploadFormView: React.FC<Props> = ({
  loading,
  slots,
  formData,
  onThumbnailPress,
  onSubmit,
}: Props) => {
  const {
    fieldName,
    control,
    formFields,
    imageFields,
    formPhotos,
    customValidationRules,
    errors,
  } = formData;

  return (
    <View style={styles.uploadForm}>
      <Text style={styles.text}>{`Upload ${slots} file(s)`}</Text>
      <ScrollView
        contentContainerStyle={styles.thumbnailsContainer}
        horizontal={true}
        fadingEdgeLength={60}>
        {imageFields.map((image, index) => {
          const formImage = formPhotos[index] ?? null;

          return (
            <Controller
              defaultValue={formFields}
              control={control}
              name={`${fieldName}.${index}`}
              key={index}
              rules={{
                required: true,
                min: slots,
                max: slots,
                validate: customValidationRules,
              }}
              render={() => (
                <View
                  style={styles.thumbnailMargin}>
                  <ImageThumbnail
                    key={index.toString()}
                    size={55}
                    src={formImage?.uri}
                    onPress={() => {
                      if (!loading) {
                        onThumbnailPress(index);
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
        {errors.photos ? `You have to upload all ${slots} images.` : ''}
      </Text>
      <View style={styles.submitButton}>
        <Button title={'Upload'} onPress={onSubmit} disabled={loading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  thumbnailsContainer: {
    marginBottom: 10,
    // flex: 1,
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  thumbnailMargin: {
    marginHorizontal: 3,
  },
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
