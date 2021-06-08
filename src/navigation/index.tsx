import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackScreen} from './RootStack';

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};
