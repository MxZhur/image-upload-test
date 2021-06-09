import React from 'react'; 
import {useSelector} from 'react-redux';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStack/types';
import {Store} from '../../store/types';
import {MainScreenView} from './view';
import { ImagePreviewData } from '../../store/images/types';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Main'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

export const MainScreen: React.FC<Props> = ({navigation, route}: Props) => {
  const images = useSelector((state: Store) => state.images);

  return (
    <MainScreenView
      uploadedImages={images}
      onThumbnailPress={(item: ImagePreviewData) => {
        navigation.navigate('ImagePreview', {
          url: item.uri,
        });
      }}
    />
  );
};
