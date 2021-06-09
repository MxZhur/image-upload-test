import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../../navigation/RootStack/types';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ImagePreview'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'ImagePreview'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

export const ImagePreviewScreen: React.FC<Props> = ({navigation, route}: Props) => {
  const url = route.params.url;

  return (
    <View style={{
      flex: 1,
    }}>
      <Image style={styles.image} source={{uri: url}} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 'auto',
    resizeMode: 'contain',
    flex: 1,
  },
});
