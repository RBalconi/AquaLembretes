import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

function Loading(props) {
  if (!props.show) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator size={props.size} color={props.color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#f0f0f5',
    zIndex: 2,
  },
});

export default Loading;
