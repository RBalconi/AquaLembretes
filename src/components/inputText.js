import React, { forwardRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';

function inputText(props, ref) {
  return (
    <TextInput
      style={[styles.input, props.error && styles.inputError]}
      placeholder={props.placeholder}
      returnKeyType={props.returnKeyType}
      value={props.value}
      onChangeText={text => props.onChangeText(text)}
      ref={ref}
      onSubmitEditing={() => props.onSubmitEditing()}
      {...props}
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

export default forwardRef(inputText);
