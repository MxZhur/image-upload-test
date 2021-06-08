import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {ImageThumbnail, PlaceholderMessageView} from '../../../components';
import {ImageUploadForm} from '../../../containers';

type Props = {
  uploadedImages: string[];
  onThumbnailPress: (item: any) => void;
};

export const MainScreenView: React.FC<Props> = ({
  uploadedImages,
  onThumbnailPress,
}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      {uploadedImages.length ? (
        <FlatList
          contentContainerStyle={styles.imagesList}
          horizontal={false}
          numColumns={3}
          data={uploadedImages}
          renderItem={item => (
            <View style={styles.thumbnailWrapper}>
              <ImageThumbnail
                src={null} // TODO: Replace by the actual image URI
                onPress={() => {
                  onThumbnailPress(item);
                }}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <PlaceholderMessageView
          message={'No images found.'}
          iconName={'image'}
        />
      )}

      <ImageUploadForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imagesList: {
    alignContent: 'flex-start',
    padding: 10,
  },
  thumbnailWrapper: {
    margin: 5,
  },
});
