import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function InputNumber({ onChangeText = text => {}, value }) {
  // console.log('----------------');
  // console.log('value ' + value);

  const [number, setNumber] = useState(parseFloat(value));
  // console.log('number ' + number);

  function increase() {
    const numberAdded = number + 1;
    setNumber(numberAdded);
    onChangeText(numberAdded);
  }

  function decrease() {
    const numberSubtracted = number - 1;
    setNumber(numberSubtracted);
    onChangeText(numberSubtracted);
  }
  return (
    <View style={styles.containerNumberInput}>
      <TouchableWithoutFeedback
        onPress={() => {
          decrease();
        }}>
        <MaterialCommunityIcons
          style={styles.button}
          name="minus"
          color="#AAAABB"
          size={28}
        />
      </TouchableWithoutFeedback>
      <TextInput
        style={styles.textInput}
        textAlign="center"
        keyboardType="numeric"
        placeholder="Qnt"
        returnKeyType="next"
        // value={Number.isNaN(number) ? '0' : number?.toString()}
        value={number?.toString()}
        onChangeText={text => {
          onChangeText(parseFloat(text));
          setNumber(parseFloat(text));
        }}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          increase();
        }}>
        <MaterialCommunityIcons
          style={styles.button}
          name="plus"
          color="#AAAABB"
          size={28}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  containerNumberInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
});

export default InputNumber;
