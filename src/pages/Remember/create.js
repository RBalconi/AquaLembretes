import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Keyboard,
  ToastAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RectButton } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import PickerSelect from 'react-native-picker-select';

const RememberCreate = () => {
  const [date, setDate] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState();
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
    setShowTimePicker(false);
  };

  return (
    <>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <TextInput
          style={styles.input}
          placeholder="Nome do lembrete"
          returnKeyType={'next'}
        />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setShowDatePicker(true);
            }}>
            <View style={styles.containerIconInputText}>
              <TextInput
                // editable={false}
                style={styles.inputIcon}
                placeholder="Data"
                returnKeyType={'next'}
                value={date?.toString()}
              />
              <MaterialCommunityIcons
                style={styles.iconInputText}
                name="calendar-month"
                color="#AAAABB"
                size={22}
              />
              {showDatePicker && (
                <DateTimePicker
                  minimumDate={new Date()}
                  value={new Date()}
                  mode="date"
                  display="calendar"
                  onChange={onChangeDate}
                />
              )}
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              setShowTimePicker(true);
            }}>
            <View style={[styles.containerIconInputText, { marginLeft: 20 }]}>
              <TextInput
                // editable={false}
                style={styles.inputIcon}
                placeholder="Hora"
                returnKeyType={'next'}
                value={time?.toString()}
              />
              <MaterialCommunityIcons
                style={styles.iconInputText}
                name="clock-outline"
                color="#AAAABB"
                size={22}
              />
              {showTimePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="time"
                  is24Hour={true}
                  display="clock"
                  onChange={onChangeTime}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
        <PickerSelect
          style={pickerSelectStyles}
          onValueChange={value => console.log(value)}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Repetir a cada',
            value: null,
            color: '#AAAABB',
          }}
          items={[
            { label: '30 em 30 dias', value: '30' },
            { label: '15 em 15 dias', value: '15' },
            { label: '7 em 7 dias', value: '5' },
            { label: 'Todo dia', value: '1' },
            { label: 'Não repetir', value: '0' },
          ]}
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
        <PickerSelect
          style={pickerSelectStyles}
          onValueChange={value => console.log(value)}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Selecione o Aquário',
            value: null,
            color: '#AAAABB',
          }}
          items={[
            { label: 'Aquario 1', value: '1' },
            { label: 'Aquario 2', value: '2' },
          ]}
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
        <PickerSelect
          style={pickerSelectStyles}
          onValueChange={value => console.log(value)}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Selecione a categoria',
            value: null,
            color: '#AAAABB',
          }}
          items={[
            { label: 'Fertilizante', value: 'fertilizer' },
            { label: 'Medicação', value: 'medication' },
            { label: 'Suplementação', value: 'supplementation' },
            { label: 'Limpeza (TPA)', value: 'tpa' },
          ]}
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
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View
            style={[
              styles.containerIconInputText,
              { flex: 1, flexDirection: 'row', alignItems: 'center' },
            ]}>
            <TouchableWithoutFeedback>
              <MaterialCommunityIcons
                style={styles.iconInputText}
                name="minus"
                color="#AAAABB"
                size={28}
              />
            </TouchableWithoutFeedback>
            <TextInput
              style={{ flex: 1, fontSize: 16 }}
              textAlign={'center'}
              keyboardType="numeric"
              placeholder="0"
              returnKeyType={'next'}
            />
            <TouchableWithoutFeedback>
              <MaterialCommunityIcons
                style={styles.iconInputText}
                name="plus"
                color="#AAAABB"
                size={28}
              />
            </TouchableWithoutFeedback>
          </View>
          <PickerSelect
            style={{
              ...pickerSelectStyles,
              inputAndroid: {
                flex: 1,
                width: 160,
                height: 60,
                backgroundColor: '#FFF',
                borderRadius: 8,
                marginBottom: 20,
                marginLeft: 20,
                paddingHorizontal: 24,
                fontSize: 16,
              },
            }}
            onValueChange={value => console.log(value)}
            useNativeAndroidPickerStyle={false}
            placeholder={{
              label: 'Un. de medida',
              value: null,
              color: '#9EA0A4',
            }}
            items={[
              { label: 'Mililitros (ml)', value: 'ml' },
              { label: 'Litros (L)', value: 'lts' },
              { label: 'Gotas (Gts)', value: 'gts' },
              { label: 'Gramas (Gr)', value: 'gr' },
              { label: 'Quilo (Kg)', value: 'kg' },
            ]}
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
        <RectButton style={styles.button} onPress={() => {}}>
          <View style={styles.buttonIcon}>
            <MaterialCommunityIcons name="arrow-right" color="#FFF" size={24} />
          </View>
          <Text style={styles.buttonText}>Salvar</Text>
        </RectButton>
      </KeyboardAwareScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  containerIconInputText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  iconInputText: {
    padding: 20,
  },
  inputIcon: {
    flex: 1,
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },

  datePicker: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 24,
  },

  button: {
    backgroundColor: '#4499DD',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 85, 180, 0.5)',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
});

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
export default RememberCreate;
