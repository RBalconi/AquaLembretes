import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';

import AquariumHome from './pages/Aquarium/home';
import AquariumIndex from './pages/Aquarium/index';
import AquariumShow from './pages/Aquarium/show';
import AquariumCreate from './pages/Aquarium/create';

import RememberHome from './pages/Remember/home';
import RememberIndex from './pages/Remember/index';
import RememberCreate from './pages/Remember/create';
// import RememberShow from './pages/Remember/show';

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode="none">
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Remember" component={RememberHome} />
        <AppStack.Screen name="Aquarium" component={AquariumHome} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

const AquariumNavigation = props => {
  return (
    <AppStack.Navigator headerMode="none">
      <AppStack.Screen name="AquariumIndex" component={AquariumIndex} />
      <AppStack.Screen name="AquariumShow" component={AquariumShow} />
      <AppStack.Screen name="AquariumCreate" component={AquariumCreate} />
    </AppStack.Navigator>
  );
};

const RememberNavigation = props => {
  return (
    <AppStack.Navigator headerMode="none">
      <AppStack.Screen name="RememberIndex" component={RememberIndex} />
      <AppStack.Screen name="RememberCreate" component={RememberCreate} />
    </AppStack.Navigator>
  );
};

export { Routes, AquariumNavigation, RememberNavigation };
