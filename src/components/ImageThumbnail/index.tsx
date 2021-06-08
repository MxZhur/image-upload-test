import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  src?: string | null;
  size?: number;
  onPress?: () => void;
  placeholderIcon?: 'image' | 'help' | 'add';
};

const MIN_SIZE = 24;

export const ImageThumbnail: React.FC<Props> = ({
  src,
  onPress,
  size = 100,
  placeholderIcon = 'image',
}: Props) => {
  const sizeNormalized = Math.max(size, MIN_SIZE);

  const containerSizeStyle = {
    width: sizeNormalized,
    height: sizeNormalized,
    borderRadius: size / 8,
  };

  const wrappedComponent = (
    <View
      style={[
        styles.container,
        containerSizeStyle,
        src ? {} : styles.containerEmpty,
      ]}>
      {src ? (
        <Image source={{uri: src}} style={styles.image} />
      ) : (
        <Icon name={placeholderIcon} size={sizeNormalized / 2} color={'gray'} />
      )}
    </View>
  );

  return onPress !== undefined ? (
    <TouchableOpacity onPress={onPress}>{wrappedComponent}</TouchableOpacity>
  ) : (
    wrappedComponent
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  containerEmpty: {
    borderStyle: 'dashed',
    borderColor: 'gray',
    borderWidth: 2,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  image: {
    width: 'auto',
    alignSelf: 'stretch',
    resizeMode: 'cover',
    flex: 1,
  },
});
