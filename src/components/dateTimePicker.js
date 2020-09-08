import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PickerDateTime from '@react-native-community/datetimepicker';
import moment from 'moment';

function DateTimePicker({
  value,
  onChange = () => {},
  placeholder,
  format,
  iconName,
  mode,
  display,
  error,
}) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setShowPicker(true);
      }}>
      <View style={[styles.containerIconInputText, error && styles.inputError]}>
        <TextInput
          editable={false}
          style={styles.inputIcon}
          placeholder={placeholder}
          returnKeyType="next"
          value={value ? moment(value).format(format) : ''}
        />
        <MaterialCommunityIcons
          style={styles.iconInputText}
          name={iconName}
          color="#AAAABB"
          size={22}
        />
        {showPicker && (
          <PickerDateTime
            minimumDate={new Date()}
            value={new Date()}
            mode={mode}
            display={display}
            is24Hour={true}
            onChange={text => {
              setShowPicker(false);
              onChange(text.nativeEvent.timestamp);
            }}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  containerIconInputText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  iconInputText: {
    paddingRight: 20,
  },
  inputIcon: {
    flex: 1,
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#0055AA',
    borderWidth: 2,
  },
});

export default DateTimePicker;
