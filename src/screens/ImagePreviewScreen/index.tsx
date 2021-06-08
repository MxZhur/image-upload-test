import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../navigation/RootStack/types';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ImagePreview'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'ImagePreview'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

export const ImagePreviewScreen: React.FC<Props> = ({navigation, route}: Props) => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({});
