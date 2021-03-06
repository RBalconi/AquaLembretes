import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import { AquariumNavigation } from '../../routes';

import Header from '../../components/header';

const AquariumHome = props => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={{ flex: 1, backgroundColor: '#0055AA' }}>
        <View style={styles.container}>
          <Header title={'Aquários'} animation={'aquarium'} />
        </View>
        <View style={styles.containerContent}>
          <AquariumNavigation />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingTop: 20 + StatusBar.currentHeight,
  },

  containerContent: {
    flex: 1,
    backgroundColor: '#f0f0f5',
    borderTopStartRadius: 40,
    padding: 20,
    paddingBottom: 0,
  },
});

export default AquariumHome;
