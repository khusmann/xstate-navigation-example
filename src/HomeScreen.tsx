import * as React from 'react';
import { FC } from 'react';
import { Button, View, Text } from 'react-native';

interface HomeScreenProps {
  onDetailClick(): void;
  counter: number;
}

const HomeScreen: FC<HomeScreenProps> = ({ onDetailClick, counter }) => {
  console.log("rerender home");
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen {counter}</Text>
      <Button
        title="Go to Details"
        onPress={onDetailClick}
      />
    </View>
  );
};

export default HomeScreen;