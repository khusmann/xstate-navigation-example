import * as React from 'react';
import { FC } from 'react';
import { Button, View, Text } from 'react-native';

interface DetailsScreenProps {
  onHomeClick(): void;
  counter: number;
}

const DetailsScreen: FC<DetailsScreenProps> = ({ onHomeClick, counter }) => {
  console.log("rerender details");
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen {counter}</Text>
      <Button
        title="Go home"
        onPress={onHomeClick}
      />
    </View>
  );
};

export default DetailsScreen;