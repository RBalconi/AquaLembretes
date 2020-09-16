import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';

import getRealm from '../../services/realm';

const Home = () => {
  const navigation = useNavigation();

  const [nextRemember, setNextRemember] = useState({
    name: '',
    aquarium: '',
    repeat: '',
    date: '',
    time: '',
  });
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

  const getScheduledNextNotification = () =>
    new Promise((resolve, reject) => {
      setIsLoading(true);
      // PushNotification.getScheduledLocalNotifications(notificationsList => {
      // console.log(notificationsList);
      // });
      PushNotification.getScheduledLocalNotifications(notificationsList => {
        notificationsList
          .map(notification => notification)
          .sort((a, b) => a.date - b.date)
          .find(findValue => {
            if (moment(findValue.date).isSameOrAfter(moment(), 'minute')) {
              setIsLoading(false);
              resolve(findValue);
            }
          });
        if (!notificationsList.length) {
          setIsLoading(false);
          reject('Nothing found');
        }
      });
    });

  //

  const getIdRememberByIdNotification = notification =>
    new Promise(async (resolve, reject) => {
      setIsLoading(true);

      const realm = await getRealm();
      const idRemember = realm
        .objects('Notification')
        .filtered(`idNotification = '${notification.id}'`)
        .map(item => item.idRemember);

      setIsLoading(false);

      resolve(idRemember);
    });

  //

  async function getRememberDataById(rememberId) {
    setIsLoading(true);

    const realm = await getRealm();
    const nextRememberObj = realm
      .objects('Remember')
      .filtered(`id = '${rememberId}'`)
      .map(remember => {
        return setNextRemember({
          name: remember.name,
          aquarium: remember.aquarium,
          repeat: remember.repeat,
          date: remember.date,
          time: remember.time,
        });
      });

    setIsLoading(false);
    return nextRememberObj;
  }

  async function removeListernerRefreshNextRemember() {
    const realm = await getRealm();
    realm.removeListener('change', () => {});
  }

  const startListenerRefreshNextRemember = useCallback(async () => {
    const realm = await getRealm();
    realm.addListener('change', () => loadNextRemember());
  }, [loadNextRemember]);

  useFocusEffect(
    useCallback(() => {
      startListenerRefreshNextRemember();
      return () => {
        removeListernerRefreshNextRemember();
      };
    }, [startListenerRefreshNextRemember]),
  );

  useEffect(() => {
    loadNextRemember();
  }, [loadNextRemember]);

  const loadNextRemember = useCallback(async () => {
    getScheduledNextNotification()
      .then(nextNotification => {
        getIdRememberByIdNotification(nextNotification).then(id =>
          getRememberDataById(id),
        );
      })
      .catch(error => {
        if (error === 'Nothing found') {
          setNextRemember({
            name: '',
            aquarium: '',
            repeat: '',
            date: '',
            time: '',
          });
        }
      });
  }, []);

  function repeatDays(item) {
    if (item.repeat === 'notRepeat') {
      return 'Não repetir';
    } else if (item.repeat === 'everyDay') {
      return 'Todo dia';
    } else if (listWeekDay.some(day => item.repeat.includes(day))) {
      return 'Dias específicos';
    } else {
      return 'Intervalo de dias';
    }
  }

  function handleNavigateToRemember() {
    navigation.navigate('Remember');
  }

  function handleNavigateToAquarium() {
    navigation.navigate('Aquarium');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Olá,{'\n'}Seja bem-vindo.</Text>
        </View>

        <View style={[styles.cardRemember]}>
          <Text style={styles.titleRemember}>Próximo lembrete:</Text>
          {nextRemember.name === '' ? (
            <Text style={styles.descriptionRemember}>
              Nenhum lembrete cadastrado.
            </Text>
          ) : (
            <>
              <Text style={styles.descriptionRemember}>
                {nextRemember.name}
              </Text>
              <Text style={styles.descriptionRemember}>
                {nextRemember.aquarium}
              </Text>
              <View style={styles.lineIcon}>
                <MaterialCommunityIcons
                  name="clock-alert"
                  size={18}
                  color="#FFF"
                  style={{ paddingRight: 5 }}
                />
                <Text style={styles.descriptionRemember}>
                  {moment(nextRemember.time).format('HH:mm')} -{' '}
                  {repeatDays(nextRemember)}.
                </Text>
              </View>
            </>
          )}
          <Image
            style={styles.imageCardRemember}
            source={require('../../assets/images/remember-home.png')}
          />
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.textTitleMenu}>O que você precisa?</Text>
          <ScrollView
            style={styles.menuContainer}
            horizontal
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleNavigateToRemember}
              activeOpacity={0.6}>
              <MaterialCommunityIcons
                name="calendar-month-outline"
                color="#0055AA"
                size={50}
              />
              <Text style={styles.textItemMenu}>Lembretes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleNavigateToAquarium}
              activeOpacity={0.6}>
              <MaterialCommunityIcons
                name="fishbowl-outline"
                color="#0055AA"
                size={50}
              />

              <Text style={styles.textItemMenu}>Aquários</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#F0F0F5',
  },

  title: {
    color: '#334455',
    fontSize: 28,
    fontFamily: 'Ubuntu-Medium',
    maxWidth: 260,
    marginVertical: 90,
  },

  cardRemember: {
    backgroundColor: '#0055AA',

    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
    minHeight: 152,
  },
  lineIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageCardRemember: {
    position: 'absolute',
    right: -55,
    bottom: -35,
    zIndex: -1,
  },
  titleRemember: {
    color: '#FFF',
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    paddingBottom: 12,
  },
  descriptionRemember: {
    maxWidth: 235,
    color: '#FFF',
    fontFamily: 'Roboto-Light',
    fontSize: 18,
  },

  footerContainer: {
    marginTop: 50,
  },
  menuContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 20,
  },
  textTitleMenu: {
    color: '#334455',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
  },
  menuItem: {
    backgroundColor: '#FFF',
    height: 120,
    width: 120,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 20,
    alignItems: 'center',

    textAlign: 'center',
  },
  textItemMenu: {
    color: '#334455',
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Home;
