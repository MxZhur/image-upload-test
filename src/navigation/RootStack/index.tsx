import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MainScreen} from '../../screens';
import {ImagePreviewScreen} from '../../screens/ImagePreviewScreen';

export const RootStack = createStackNavigator();

export const RootStackScreen: React.FC = () => {
  return (
    <RootStack.Navigator initialRouteName={'Main'}>
      <RootStack.Screen
        name="Main"
        options={{
          title: 'Images',
        }}
        component={MainScreen}
      />
      <RootStack.Screen
        name="ImagePreview"
        options={{
          title: 'Image Preview',
        }}
        component={ImagePreviewScreen}
      />
    </RootStack.Navigator>
  );
};
