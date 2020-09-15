import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ToastAndroid,
  FlatList,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import PushNotification from 'react-native-push-notification';

import getRealm from '../../services/realm';
import { NotificationConfigure } from '../../services/notification';
import { deleteNotification } from '../../services/Notification/ControllerNotification';

import SwipeableList from '../../components/swipeableList';
import Loading from '../../components/loading';

const RememberIndex = () => {
  PushNotification.configure = NotificationConfigure;
  const navigation = useNavigation();

  const [remember, setRemember] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const listWeekDay = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  let swipedCardRef = null;

  const onOpen = ref => {
    if (swipedCardRef) {
      swipedCardRef.current.close();
    }
    swipedCardRef = ref;
  };
  const onClose = ref => {
    if (ref === swipedCardRef) {
      swipedCardRef = null;
    }
  };

  function chooseIcon(category) {
    switch (category) {
      case 'fertilizer':
        return 'leaf';
      case 'medication':
        return 'flask-empty-plus';
      case 'supplementation':
        return 'food-variant';
      case 'tpa':
        return 'water';
    }
  }

  async function cancelNotification(idRemember) {
    const realm = await getRealm();

    let notificationObj = realm
      .objects('Notification')
      .filtered(`idRemember = '${idRemember}'`);

    let notification;
    for (notification of notificationObj) {
      PushNotification.cancelLocalNotifications({
        id: notification.idNotification.toString(),
      });
    }
  }

  async function deleteRemember(rememberData) {
    setIsLoading(true);
    const realm = await getRealm();
    try {
      const deletingRemember = realm
        .objects('Remember')
        .filtered(`id = '${rememberData.id}'`);

      realm.write(() => {
        realm.delete(deletingRemember);
      });
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        'Ocorreu um erro ao excluir lembrete!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
    setIsLoading(false);
  }
  function handleDeleteRemember(rememberData) {
    Alert.alert(
      'Excluir',
      `Tem certeza que deseja excluir "${rememberData.name}"?`,
      [
        {
          text: 'Sim',
          onPress: () => {
            cancelNotification(rememberData.id);
            deleteNotification(rememberData.id);
            deleteRemember(rememberData);
          },
        },
        {
          text: 'Talvez depois',
          onPress: () => {},
        },
      ],
    );
  }

  async function setRememberRealm() {
    setIsLoading(true);
    const realm = await getRealm();
    const data = realm.objects('Remember').sorted('name', false);
    setRemember(data);
    setIsLoading(false);
  }

  async function removeListernerRefreshRemember() {
    const realm = await getRealm();
    realm.removeListener('change', () => {});
  }

  const startListenerRefreshRemember = useCallback(async () => {
    const realm = await getRealm();
    realm.removeAllListeners();
    realm.addListener('change', () => setRememberRealm());
  }, []);

  useEffect(() => {
    startListenerRefreshRemember();
    return () => {
      removeListernerRefreshRemember();
    };
  }, [startListenerRefreshRemember]);

  useEffect(() => {
    setRememberRealm();
  }, []);

  function handleNavigateToCreate() {
    navigation.navigate('RememberCreate', { rememberId: 0 });
  }

  function repeatDays(item) {
    if (item.repeat === 'notRepeat') {
      return `${moment(item.time).format('HH:mm')} - Não repetir`;
    } else if (item.repeat === 'everyDay') {
      return `${moment(item.time).format('HH:mm')} - Todo dia`;
    } else if (listWeekDay.some(day => item.repeat.includes(day))) {
      return `${moment(item.time).format('HH:mm')} - Dias específicos`;
    } else {
      return `${moment(item.time).format('HH:mm')} - Intervalo de dias`;
    }
  }

  return (
    <>
      <View style={styles.containerContent}>
        <Loading show={isLoading} color={'#0055AA'} size={'large'} />
        <View>
          {remember.length <= 0 && isLoading !== true ? (
            <Text style={{ color: '#000', alignSelf: 'center' }}>
              Nenhum lembrete cadastrado.
            </Text>
          ) : (
            <FlatList
              data={remember}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <SwipeableList
                  data={item}
                  icon={chooseIcon(item.category)}
                  handleDelete={handleDeleteRemember}
                  onOpen={onOpen}
                  onClose={onClose}>
                  <View style={styles.textsCard}>
                    <Text style={styles.titleCard}>{item.name}</Text>
                    <Text style={styles.dataCard}>{item.aquarium}</Text>
                    <View style={styles.measures}>
                      <Text style={styles.info}>
                        {item.quantity + ' ' + item.unity}.
                      </Text>
                      <Text style={styles.info}>{repeatDays(item)}</Text>
                    </View>
                  </View>
                </SwipeableList>
              )}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.floattingButton}
        onPress={handleNavigateToCreate}
        activeOpacity={0.6}>
        <MaterialCommunityIcons name="plus" size={44} color="#FFF" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingTop: 20 + StatusBar.currentHeight,
  },

  containerContent: {
    flex: 1,
    backgroundColor: '#f0f0f5',
    borderTopStartRadius: 40,
    paddingBottom: 0,
  },

  textsCard: {
    flex: 1,
    alignContent: 'space-between',
  },

  titleCard: {
    color: '#334455',
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
  },

  dataCard: {
    color: '#334455',
    fontFamily: 'Roboto-Light',
    fontSize: 16,
  },

  measures: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  info: {
    color: '#3A4E5F',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },

  floattingButton: {
    position: 'absolute',
    width: 57,
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 20,
    backgroundColor: '#0055AA',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});

export default RememberIndex;
