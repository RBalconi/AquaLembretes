import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RectButton } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import PickerSelect from 'react-native-picker-select';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';

import getRealm from '../../services/realm';
import RadioButtonGroup from '../../components/radioButtonGroup';
import InputNumber from '../../components/inputNumber';
import CustomModal from '../../components/customModal';

const RememberCreate = () => {
  const [data, setData] = useState({
    id: '',
    name: '',
    date: '',
    time: '',
    repeat: '', // notRepeat - everyDay - dayBreak 2 - (specificDays) monday, wednesday, friday, sunday
    aquarium: '',
    category: '',
    quantity: 0,
    unity: '',
  });

  const [radioButtonRepeat, setRadioButtonRepeat] = useState('');
  const [specificDay, setSpecificDay] = useState([
    { id: 'sunday', value: 'Domingo.', checked: false },
    { id: 'monday', value: 'Segunda-feira.', checked: false },
    { id: 'tuesday', value: 'Terça-feira.', checked: false },
    { id: 'wednesday', value: 'Quarta-feira.', checked: false },
    { id: 'thursday', value: 'Quinta-feira.', checked: false },
    { id: 'friday', value: 'Sexta-feira.', checked: false },
    { id: 'saturday', value: 'Sábado.', checked: false },
  ]);

  const [aquariumSelect, setAquariumSelect] = useState({});
  const [aquariumsSelect, setAquariumsSelect] = useState({
    options: [{ label: '', value: '' }],
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [modalSpecificDayVisible, setModalSpecificDayVisible] = useState(false);
  const [modalRangeDaysVisible, setModalRangeDaysVisible] = useState(false);

  const listRememberDate = [
    { id: 'notRepeat', text: 'Não repetir' },
    { id: 'everyDay', text: 'Todos os dias' },
    { id: 'dayBreak', text: 'Intervalo de dias', hasModal: true },
    { id: 'specificDay', text: 'Dias especifícos da semana', hasModal: true },
  ];

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || data.date;
    setData({ ...data, date: currentDate });
    setShowDatePicker(false);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || data.time;
    setData({ ...data, time: currentTime });
    setShowTimePicker(false);
  };

  useEffect(() => {
    async function setAquariumsRealm() {
      const realm = await getRealm();
      const allAquariums = realm
        .objects('Aquarium')
        .sorted('name', false)
        .map(aquarium => {
          return {
            label: aquarium.name,
            value: aquarium.id,
          };
        });
      setAquariumsSelect({ ...allAquariums, options: allAquariums });
    }
    setAquariumsRealm();
  }, []);

  async function loadAquarium(id) {
    const realm = await getRealm();
    const loadedAquarium = realm.objectForPrimaryKey('Aquarium', id);
    return loadedAquarium;
  }

  async function saveRemember() {
    const realm = await getRealm();

    // if (!data.id) {
    //   const lastRemember = realm.objects('Remember').sorted('id', true)[0];
    //   const highestId = lastRemember == null ? 0 : lastRemember.id;
    //   const newId = highestId == null ? 1 : highestId + 1;
    //   data.id = newId;
    //   setData({ data });
    // }

    chooseRadioButton();
    // console.log(data);

    // const aquariumObj = await loadAquarium(aquariumSelect);
    // data.aquarium = aquariumObj;
    // setData({ data });

    // realm.write(() => {
    //   realm.create(
    //     'Remember',
    //     {
    //       id: data.id,
    //       name: data.name,
    //       date: data.date,
    //       time: data.time,
    //       repeat: data.repeat,
    //       aquarium: data.aquarium.aquarium,
    //       category: data.category,
    //       quantity: data.quantity,
    //       unity: data.unity,
    //     },
    //     'modified',
    //   );
    // });
  }

  function handleAddRemember() {
    try {
      saveRemember();
      setData({
        id: '',
        name: '',
        date: '',
        time: '',
        repeat: '',
        aquarium: '',
        category: '',
        quantity: 0,
        unity: '',
      });
      setAquariumSelect('');
      // console.log('clear ' + JSON.stringify(data, null, 2));
      ToastAndroid.showWithGravityAndOffset(
        'Salvo com sucesso!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      Keyboard.dismiss();
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        'Ocorreu um erro!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  }

  function openModal(id) {
    switch (id) {
      case 'dayBreak':
        setModalRangeDaysVisible(true);
        break;
      case 'specificDay':
        setModalSpecificDayVisible(true);
        break;
    }
  }

  function chooseRadioButton() {
    switch (radioButtonRepeat) {
      case 'notRepeat':
        setData({ ...data, repeat: 'notRepeat' });
        break;
      case 'everyDay':
        setData({ ...data, repeat: 'everyDay' });
        break;
      case 'dayBreak':
        // setData({ ...data, repeat: 'everyDay' });
        break;
      case 'specificDay':
        const trueSpecificDay = specificDay.filter(day => day.checked === true);
        const stringDays = trueSpecificDay.map(item => item.id);
        setData({ ...data, repeat: stringDays.join() });
        break;
    }
  }

  function handleCheckBox(obj) {
    setSpecificDay(
      specificDay.map(item =>
        item.id === obj.id ? { ...item, checked: !item.checked } : item,
      ),
    );
  }

  return (
    <>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <TextInput
          style={styles.input}
          placeholder="Nome do lembrete"
          returnKeyType="next"
          value={data.name}
          onChangeText={text => setData({ ...data, name: text })}
        />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setShowDatePicker(true);
            }}>
            <View style={styles.containerIconInputText}>
              <TextInput
                editable={false}
                style={styles.inputIcon}
                placeholder="Data"
                returnKeyType="next"
                value={data.date ? moment(data.date).format('DD/MM/YYYY') : ''}
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
                editable={false}
                style={styles.inputIcon}
                placeholder="Hora"
                returnKeyType="next"
                value={data.time ? moment(data.time).format('HH:mm') : ''}
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

        <RadioButtonGroup
          data={listRememberDate}
          title="Repetir a cada"
          openModal={id => {
            openModal(id);
          }}
          onChoose={option => {
            setRadioButtonRepeat(option);
          }}
        />

        {modalSpecificDayVisible && (
          <CustomModal
            title="Escolha os dias"
            onClose={() => {
              setModalSpecificDayVisible(false);
            }}>
            {specificDay.map(day => {
              return (
                <TouchableOpacity
                  key={day.id}
                  style={styles.checkboxContainer}
                  activeOpacity={0.6}
                  onPress={() => {
                    handleCheckBox(day);
                  }}>
                  <>
                    <CheckBox
                      value={day.checked}
                      onValueChange={() => {
                        handleCheckBox(day);
                      }}
                      style={styles.checkbox}
                    />
                    <Text style={styles.checkboxText}>{day.value}</Text>
                  </>
                </TouchableOpacity>
              );
            })}
          </CustomModal>
        )}

        {modalRangeDaysVisible && (
          <CustomModal
            title="Escolha o intervalo de dias"
            onClose={() => {
              setModalRangeDaysVisible(false);
            }}>
            <View style={{ flexDirection: 'row' }}>
              <InputNumber
                value={data.quantity?.toString()}
                onChangeText={text => {
                  setData({ ...data, quantity: text });
                }}
              />
            </View>
          </CustomModal>
        )}

        <PickerSelect
          style={pickerSelectStyles}
          value={aquariumSelect}
          onValueChange={value => setAquariumSelect(value)}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Selecione o Aquário',
            value: '',
            color: '#AAAABB',
          }}
          items={aquariumsSelect.options}
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
          value={data.category}
          onValueChange={value => setData({ ...data, category: value })}
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
          <InputNumber
            value={data.quantity?.toString()}
            onChangeText={text => {
              setData({ ...data, quantity: text });
            }}
          />

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
            value={data.unity}
            onValueChange={value => setData({ ...data, unity: value })}
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
        <RectButton style={styles.button} onPress={handleAddRemember}>
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

  checkboxContainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  checkboxText: {
    alignSelf: 'center',
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
