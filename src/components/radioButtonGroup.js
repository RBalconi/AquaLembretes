import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

function RadioButtonGroup({ data, title, onChange = () => {}, value }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleGroup}>{title}</Text>
      {data.map(item => {
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.radioButtonContainer}
            activeOpacity={0.6}
            onPress={() => {
              onChange(item.id);
            }}>
            <View style={styles.radioButtonCircle}>
              {value === item.id && <View style={styles.radioButtonSelected} />}
            </View>
            <Text style={styles.radioButtonText}>{item.text}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginBottom: 20,
  },
  titleGroup: {
    fontSize: 16,
    color: '#9EA0A4',
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 4,
  },
  radioButtonText: {
    marginRight: 35,
    fontSize: 16,
    color: '#9EA0A4',
    marginLeft: 4,
  },
  radioButtonCircle: {
    height: 20,
    width: 20,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#9EA0A4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: '#9EA0A4',
  },
});

export default RadioButtonGroup;
