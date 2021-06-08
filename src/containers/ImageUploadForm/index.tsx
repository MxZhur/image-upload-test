import React from 'react';
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ImageCropPicker, {Image} from 'react-native-image-crop-picker';
import {ImageThumbnail} from '../../components';

const NUMBER_OF_IMAGES = 5;

const openPicker = (onPicked: (image: Image) => void) => {
  ImageCropPicker.openPicker({
    mediaType: 'photo',
    width: 512,
    height: 512,
    cropping: true,
    cropperCircleOverlay: true,
  })
    .then((image: Image) => {
      onPicked(image);
    })
    .catch(() => {});
};

export const ImageUploadForm: React.FC = () => {
  const data = Array<Image | null>(NUMBER_OF_IMAGES);

  return (
    <View style={styles.uploadForm}>
      <Text style={styles.text}>{`Upload ${NUMBER_OF_IMAGES} file(s)`}</Text>
      <FlatList
        contentContainerStyle={{
          marginBottom: 10,
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        horizontal={true}
        fadingEdgeLength={30}
        data={data.slice(0, NUMBER_OF_IMAGES)}
        renderItem={({item}) => <ImageThumbnail size={55} src={null} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.submitButton}>
        <Button
          title={'Upload'}
          onPress={() => {
            // onUploadButtonPress();
          }}
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
  submitButton: {
    alignSelf: 'stretch',
  },
});
