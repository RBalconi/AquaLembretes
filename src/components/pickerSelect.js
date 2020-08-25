import React from 'react';
import { StyleSheet, View } from 'react-native';
import Select from 'react-native-picker-select';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function PickerSelect({ value, onValueChange = () => {}, items, placeholder }) {
  return (
    <View>
      <Select
        style={{
          ...pickerSelectStyles,
          // inputAndroid: {
          //   flex: 1,
          //   width: 160,
          //   height: 60,
          //   backgroundColor: '#FFF',
          //   borderRadius: 8,
          //   marginBottom: 20,
          //   marginLeft: 20,
          //   paddingHorizontal: 24,
          //   fontSize: 16,
          // },
        }}
        value={value}
        onValueChange={item => onValueChange(item)}
        useNativeAndroidPickerStyle={false}
        placeholder={{
          label: placeholder,
          value: null,
          color: '#9EA0A4',
        }}
        items={items}
        Icon={() => {
          return (
            <MaterialCommunityIcons
              name="chevron-down"
              color="#AAAABB"
              size={28}
            />
          );
        }}
      />
    </View>
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    flex: 1,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  inputAndroid: {
    flex: 1,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  iconContainer: {
    top: 16,
    right: 12,
  },
});
export default PickerSelect;
