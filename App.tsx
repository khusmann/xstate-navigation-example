import React, { useEffect } from 'react';

import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useMachine } from '@xstate/react';
import { createMachine, assign } from 'xstate';

import { HomeScreen, DetailsScreen } from './src';

type StackParamList = {
  home: undefined,
  details: undefined,
};

const Stack = createNativeStackNavigator<StackParamList>();

type NavEvent =
  | { type: 'DETAIL_CLICK' }
  | { type: 'HOME_CLICK' }

interface NavContext {
  counter: number;
}

const NavMachine = createMachine<NavContext, NavEvent>({
  id: 'NavMachine',
  initial: 'home',
  context: {
    counter: 0,
  },
  states: {
    home: {
      on: { DETAIL_CLICK: 'details' }
    },
    details: {
      on: { 
        HOME_CLICK: {
          target: 'home',
          actions: [assign({ counter: (context) => context.counter + 1 })]
        },
      },
    },
  },
});

const App = () => {
  const navRef = useNavigationContainerRef<StackParamList>();
  const [state, send, service] = useMachine(NavMachine);

  console.log(state.value);

  useEffect(() => {
    const subscription = service.subscribe((_state) => {
      if (_state.matches('home')) {
        navRef.navigate('home');
      } else if (_state.matches('details')) {
        navRef.navigate('details');
      } else {
        console.log('No screen for state: ' + _state.value);
      }
    });
    return subscription.unsubscribe;
  }, [service, navRef]);

  return (
    <NavigationContainer ref={navRef}>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home">
        {() => (
          <HomeScreen
            onDetailClick={() => send('DETAIL_CLICK')}
            counter={state.context.counter}
          />
        )}
        </Stack.Screen>
        <Stack.Screen name="details">
        {() => (
          <DetailsScreen
            onHomeClick={() => send('HOME_CLICK')}
            counter={state.context.counter}
          />
        )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;