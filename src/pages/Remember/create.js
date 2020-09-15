import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';
import PushNotification from 'react-native-push-notification';

import getRealm from '../../services/realm';
import { NotificationConfigure } from '../../services/notification';

import { saveNotification } from '../../services/Notification/ControllerNotification';

import RadioButtonGroup from '../../components/radioButtonGroup';
import InputNumber from '../../components/inputNumber';
import CustomModal from '../../components/customModal';
import PickerSelect from '../../components/pickerSelect';
import Button from '../../components/button';
import DateTimePicker from '../../components/dateTimePicker';
import TextInput from '../../components/inputText';

const RememberCreate = () => {
  PushNotification.configure = NotificationConfigure;

  const [data, setData] = useState({
    id: '',
    name: '',
    date: '',
    time: '',
    repeat: '', // (notRepeat) | (everyDay) | (rangeDay) 2  | (specificDays) monday, wednesday, friday, sunday
    aquarium: '',
    category: '',
    quantity: '',
    unity: '',
  });

  const [error, setError] = useState({
    name: false,
    date: false,
    time: false,
    repeat: false,
    aquarium: false,
    category: false,
    quantity: false,
    unity: false,
  });

  const [rangeDay, setRangeDay] = useState(0);

  const [radioButtonGroupValue, setRadioButtonGroupValue] = useState();

  const [specificDay, setSpecificDay] = useState([
    { id: 'sunday', value: 'Domingo.', checked: false },
    { id: 'monday', value: 'Segunda-feira.', checked: false },
    { id: 'tuesday', value: 'Terça-feira.', checked: false },
    { id: 'wednesday', value: 'Quarta-feira.', checked: false },
    { id: 'thursday', value: 'Quinta-feira.', checked: false },
    { id: 'friday', value: 'Sexta-feira.', checked: false },
    { id: 'saturday', value: 'Sábado.', checked: false },
  ]);

  const [aquariumSelect, setAquariumSelect] = useState('');
  const [aquariumsSelect, setAquariumsSelect] = useState({
    options: [{ label: '', value: '' }],
  });

  const [, setShowDatePicker] = useState(false);
  const [, setShowTimePicker] = useState(false);

  const [modalSpecificDayVisible, setModalSpecificDayVisible] = useState(false);
  const [modalRangeDaysVisible, setModalRangeDaysVisible] = useState(false);

  const listRememberDate = [
    { id: 'notRepeat', text: 'Não repetir' },
    { id: 'everyDay', text: 'Todos os dias' },
    { id: 'rangeDay', text: 'Intervalo de dias', hasModal: true },
    { id: 'specificDay', text: 'Dias específicos da semana', hasModal: true },
  ];

  function scheduleNotification(
    id,
    title,
    message,
    date,
    time,
    repeatType,
    repeatTime,
  ) {
    const dateByInputs = moment(date)
      .subtract(moment(date).hour(), 'hour')
      .subtract(moment(date).minutes(), 'minutes')
      .subtract(moment(date).seconds(), 'seconds')
      .add(moment(time).hour(), 'hour')
      .add(moment(time).minutes(), 'minutes');

    PushNotification.localNotificationSchedule({
      allowWhileIdle: true,
      id,
      userInfo: { id },
      title,
      message,
      date: new Date(dateByInputs),
      repeatType,
      repeatTime,
    });
  }

  async function getIdNotification() {
    const realm = await getRealm();

    const lastId = await realm.objects('Notification').sorted('id', true)[0];
    const highestId = lastId == null ? 0 : lastId.idNotification;
    const idNotification = highestId == null ? 1 : highestId + 1;
    return idNotification;
  }

  function translateCategory(category) {
    switch (category) {
      case 'fertilizer':
        return 'Fetilização';
      case 'medication':
        return 'Medicação';
      case 'supplementation':
        return 'Suplementação';
      case 'tpa':
        return 'Limpeza';
    }
  }

  async function sendNotification() {
    const category = translateCategory(data.category);
    switch (radioButtonGroupValue) {
      case 'notRepeat': {
        const idNotification = await getIdNotification();
        scheduleNotification(
          idNotification,
          `Olá, chegou a hora do lembrete "${data.name}."`,
          `O aquário ${data.aquarium} precisa receber uma ${category}.`,
          data.date,
          data.time,
        );
        await saveNotification(data.id, idNotification);
        break;
      }
      case 'everyDay': {
        const idNotification = await getIdNotification();
        scheduleNotification(
          idNotification,
          `Olá, chegou a hora do lembrete "${data.name}."`,
          `O aquário ${data.aquarium} precisa receber uma ${category}.`,
          data.date,
          data.time,
          'day',
        );
        await saveNotification(data.id, idNotification);
        break;
      }
      case 'rangeDay': {
        const idNotification = await getIdNotification();
        scheduleNotification(
          idNotification,
          `Olá, chegou a hora do lembrete "${data.name}."`,
          `O aquário ${data.aquarium} precisa receber uma ${category}.`,
          data.date,
          data.time,
          'time',
          data.repeat * 24 * 60 * 60 * 1000,
        );
        await saveNotification(data.id, idNotification);
        break;
      }
      case 'specificDay': {
        let day;
        for (day of specificDay) {
          if (day.checked) {
            const idNotification = await getIdNotification();

            let date = moment().day(day.id)._d;
            if (moment(moment().day(day.id)._d).isBefore(moment())) {
              const weekDay = moment()
                .day(day.id)
                .weekday();
              date = moment().day(weekDay + 7);
            }

            scheduleNotification(
              idNotification,
              `Olá, chegou a hora do lembrete "${data.name}."`,
              `O aquário ${data.aquarium} precisa receber uma ${category}.`,
              date,
              data.time,
              'week',
            );

            await saveNotification(data.id, idNotification);
          }
        }
        break;
      }
    }
  }

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

  function validateInputsToSave() {
    const temp = { ...error };
    let erro,
      hasApproved = false;
    for (erro in error) {
      temp[erro] = !data[erro];
      !data[erro] ? (hasApproved = false) : (hasApproved = true);
      setError(temp);
    }
    if (hasApproved) {
      return true;
    }
  }

  useEffect(() => {
    async function loadID() {
      const realm = await getRealm();
      if (!data.id) {
        const lastRemember = realm.objects('Remember').sorted('id', true)[0];
        const highestId = lastRemember == null ? 0 : lastRemember.id;
        const newId = highestId == null ? 1 : highestId + 1;
        setData({ ...data, id: newId });
      }
    }
    loadID();
  }, [data]);

  async function saveRemember() {
    const realm = await getRealm();

    realm.write(() => {
      realm.create(
        'Remember',
        {
          id: data.id,
          name: data.name,
          date: new Date(data.date),
          time: new Date(data.time),
          repeat: data.repeat,
          aquarium: data.aquarium,
          category: data.category,
          quantity: parseFloat(data.quantity),
          unity: data.unity,
        },
        'modified',
      );
    });
  }

  function setAllCheckboxesDateFalse() {
    setSpecificDay(
      specificDay.map(item => {
        return item.checked === true ? { ...item, checked: false } : item;
      }),
    );
  }

  function onChangeSelectAquarium(value) {
    const labelSelected = aquariumsSelect.options.filter(
      aquarium => aquarium.value === value,
    );
    setAquariumSelect(value);
    setData({ ...data, aquarium: labelSelected[0]?.label });
  }

  function onChangeDate(selectedDate) {
    setShowDatePicker(false);
    const currentDate = selectedDate || data.date;
    setData({ ...data, date: currentDate });
  }
  function onChangeTime(selectedTime) {
    setShowTimePicker(false);
    const currentTime = selectedTime || data.time;
    setData({ ...data, time: currentTime });
  }

  function onCloseCancelSpecificDayModal() {
    setAllCheckboxesDateFalse();
    setModalSpecificDayVisible(false);
    setRadioButtonGroupValue('');
    setData({ ...data, repeat: '' });
  }
  function onCloseSucessSpecificDayModal() {
    const trueSpecificDay = specificDay.filter(day => day.checked === true);
    const stringDays = trueSpecificDay.map(item => item.id).join();
    data.repeat = stringDays;
    setData(data);

    setModalSpecificDayVisible(false);
  }

  function onCloseCancelRangeDaysModal() {
    setRangeDay(0);
    setModalRangeDaysVisible(false);
    setRadioButtonGroupValue('');
    setData({ ...data, repeat: '' });
  }
  function onCloseSucessRangeDaysModal() {
    data.repeat = rangeDay.toString();
    setData(data);
    setModalRangeDaysVisible(false);
  }

  function handleChooseRadioButton(option) {
    if (option === 'notRepeat' || option === 'everyDay') {
      data.repeat = option;
      setData(data);
    }
    if (option === 'rangeDay') {
      setModalRangeDaysVisible(true);
    }
    if (option === 'specificDay') {
      setModalSpecificDayVisible(true);
    }
  }

  function handleCheckBox(obj) {
    setSpecificDay(
      specificDay.map(item => {
        return item.id === obj.id ? { ...item, checked: !item.checked } : item;
      }),
    );
  }

  async function handleAddRemember() {
    const approved = validateInputsToSave();
    if (!approved) {
      ToastAndroid.showWithGravityAndOffset(
        'Ops, ocorreu um erro!\nPor favor preencha todos os campos.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return;
    }
    await saveRemember();
    sendNotification();
    setError({
      name: false,
      date: false,
      time: false,
      repeat: false,
      aquarium: false,
      category: false,
      quantity: false,
      unity: false,
    });
    setData({
      id: '',
      name: '',
      date: '',
      time: '',
      repeat: '',
      aquarium: '',
      category: '',
      quantity: '',
      unity: '',
    });
    setAllCheckboxesDateFalse();
    setRangeDay(0);
    setRadioButtonGroupValue('');
    setAquariumSelect('');

    ToastAndroid.showWithGravityAndOffset(
      'Salvo com sucesso!',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    Keyboard.dismiss();
  }

  return (
    <>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <TextInput
          placeholder="Nome do lembrete"
          returnKeyType="next"
          value={data.name}
          error={error.name}
          onChangeText={text => setData({ ...data, name: text })}
          onSubmitEditing={() => {}}
        />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <DateTimePicker
            value={data.date}
            placeholder="Iniciar em"
            format="DD/MM/YYYY"
            iconName="calendar-month"
            mode="date"
            display="calendar"
            onChange={text => {
              onChangeDate(text);
            }}
            error={error.date}
          />
          <View style={{ marginLeft: 20, flex: 1 }}>
            <DateTimePicker
              value={data.time}
              placeholder="Ás"
              format="HH:mm"
              iconName="clock-outline"
              mode="time"
              display="clock"
              onChange={text => {
                onChangeTime(text);
              }}
              error={error.time}
            />
          </View>
        </View>

        <RadioButtonGroup
          data={listRememberDate}
          title="Intervalo de repetição"
          value={radioButtonGroupValue}
          onChange={option => {
            handleChooseRadioButton(option);
            setRadioButtonGroupValue(option);
          }}
          error={error.repeat}
        />

        {modalSpecificDayVisible && (
          <CustomModal
            title="Escolha os dias"
            onCloseSucess={() => {
              onCloseSucessSpecificDayModal();
            }}
            onCloseCancel={() => {
              onCloseCancelSpecificDayModal();
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
            onCloseSucess={() => {
              onCloseSucessRangeDaysModal();
            }}
            onCloseCancel={() => {
              onCloseCancelRangeDaysModal();
            }}>
            <View style={{ flexDirection: 'row' }}>
              <InputNumber
                value={rangeDay.toString()}
                onChangeText={text => {
                  setRangeDay(text);
                }}
              />
            </View>
          </CustomModal>
        )}

        <PickerSelect
          value={aquariumSelect}
          onValueChange={value => onChangeSelectAquarium(value)}
          placeholder="Selecione o Aquário"
          items={aquariumsSelect.options}
          error={error.aquarium}
        />

        <PickerSelect
          value={data.category}
          onValueChange={value => setData({ ...data, category: value })}
          placeholder="Selecione a categoria"
          items={[
            { label: 'Fertilização', value: 'fertilizer' },
            { label: 'Medicação', value: 'medication' },
            { label: 'Suplementação', value: 'supplementation' },
            { label: 'Limpeza', value: 'tpa' },
          ]}
          error={error.category}
        />

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <InputNumber
            placeholder="Qnt"
            value={data.quantity}
            onChangeText={text => {
              setData({ ...data, quantity: text });
            }}
            error={error.quantity}
          />
          <View style={{ marginLeft: 20, width: '48%' }}>
            <PickerSelect
              value={data.unity}
              onValueChange={value => setData({ ...data, unity: value })}
              placeholder="Un. de medida"
              items={[
                { label: 'Mililitros (ml)', value: 'ml' },
                { label: 'Litros (L)', value: 'lts' },
                { label: 'Gotas (Gts)', value: 'gts' },
                { label: 'Gramas (Gr)', value: 'gr' },
                { label: 'Quilo (Kg)', value: 'kg' },
              ]}
              error={error.unity}
            />
          </View>
        </View>
        <Button
          onPress={handleAddRemember}
          text="Salvar"
          iconName="arrow-right"
        />
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  checkboxText: {
    alignSelf: 'center',
  },
});

export default RememberCreate;
