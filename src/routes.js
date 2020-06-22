import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Remember from './pages/Remember';

import Aquarium from './pages/Aquarium';
import AquariumShow from './pages/Aquarium/show';
import AquariumCreate from './pages/Aquarium/create';

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode="none">
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Remember" component={Remember} />
        <AppStack.Screen name="Aquarium" component={Aquarium} />
        <AppStack.Screen name="AquariumShow" component={AquariumShow} />
        <AppStack.Screen name="AquariumCreate" component={AquariumCreate} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
