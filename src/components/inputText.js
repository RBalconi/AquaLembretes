import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

function inputText({
  value,
  placeholder,
  returnKeyType,
  onChangeText = () => {},
  error,
}) {
  return (
    <TextInput
      style={[styles.input, error && styles.inputError]}
      placeholder={placeholder}
      returnKeyType={returnKeyType}
      value={value}
      onChangeText={text => onChangeText(text)}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#0055AA',
    borderWidth: 2,
  },
});

export default inputText;
