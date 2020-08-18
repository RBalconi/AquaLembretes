import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

function RadioButtonGroup({
  data,
  title,
  openModal = id => {},
  onChoose = option => {},
}) {
  const [value, setValue] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {data.map(item => {
        return (
          <View style={styles.radioButton}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.radioCircle}
              onPress={() => {
                setValue(item.id);
                openModal(item.id);
                onChoose(item.id);
              }}>
              {value === item.id && <View style={styles.selectedRb} />}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setValue(item.id);
                openModal(item.id);
                onChoose(item.id);
              }}>
              <Text style={styles.radioText}>{item.text}</Text>
            </TouchableOpacity>
          </View>
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
  title: {
    fontSize: 16,
    color: '#9EA0A4',
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  radioText: {
    marginRight: 35,
    fontSize: 16,
    color: '#9EA0A4',
    marginLeft: 4,
    marginBottom: 4,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#9EA0A4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: '#9EA0A4',
  },
});

export default RadioButtonGroup;
