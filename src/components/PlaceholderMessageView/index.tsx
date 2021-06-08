import React from 'react';
import {ColorValue, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  message?: string | string[];
  iconName?: string;
};

export const PlaceholderMessageView: React.FC<Props> = ({
  message,
  iconName,
}: Props) => {
  const color: ColorValue = 'lightgray';

  const messageParagraphs =
    (message instanceof Array ? message : message?.split('\n')) || [];

  const messageParagraphsProcessed = messageParagraphs.map(x =>
    x.trim().replace('\t', ''),
  );

  return (
    <View style={styles.container}>
      {iconName && <Icon name={iconName} color={color} size={75} />}
      {messageParagraphsProcessed.map((paragraph, index) => (
        <Text
          key={index}
          style={{
            color: color,
          }}>
          {paragraph}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
