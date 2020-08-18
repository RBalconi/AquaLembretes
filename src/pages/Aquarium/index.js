import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  Text,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import getRealm from '../../services/realm';
import RNFS from 'react-native-fs';

import SwipeableList from '../../components/swipeableList';
import Loading from '../../components/loading';

const AquariumIndex = props => {
  const navigation = useNavigation();

  const [aquariums, setAquariums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  async function deleteAquarium(aquarium) {
    setIsLoading(true);
    const realm = await getRealm();
    try {
      const deletingAquarium = realm
        .objects('Aquarium')
        .filtered(`id = '${aquarium.id}'`);

      realm.write(() => {
        realm.delete(deletingAquarium);
      });
      RNFS.unlink(aquarium.imageName);
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        'Ocorreu um erro ao excluir!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
    setIsLoading(false);
  }

  function handleDeleteAquarium(aquarium) {
    Alert.alert(
      'Excluir',
      `Tem certeza que deseja excluir "${aquarium.name}"?`,
      [
        {
          text: 'Sim',
          onPress: () => {
            deleteAquarium(aquarium);
          },
        },
        {
          text: 'Talvez depois',
          onPress: () => {},
        },
      ],
    );
  }

  async function setAquariumsRealm() {
    setIsLoading(true);
    const realm = await getRealm();
    const data = realm.objects('Aquarium').sorted('name', false);
    setAquariums(data);
    setIsLoading(false);
    // console.log('setAquariumsRealm');
  }
  async function removeListenerRefreshAquarium() {
    const realm = await getRealm();
    realm.removeListener('change', () => {});
    // console.log('removeListenerRefreshAquarium');
  }
  const startListenerRefreshAquarium = useCallback(async () => {
    const realm = await getRealm();
    realm.addListener('change', () => setAquariumsRealm());
    // console.log('startListenerRefreshAquarium');
  }, []);

  useEffect(() => {
    startListenerRefreshAquarium();
    // setAquariumsRealm();
    return () => {
      removeListenerRefreshAquarium();
      // setAquariumsRealm();
    };
  }, [startListenerRefreshAquarium]);

  useEffect(() => {
    setAquariumsRealm();
  }, []);

  function handleEditAquarium(aquarium) {
    navigation.navigate('AquariumCreate', { aquariumId: aquarium.id });
  }

  function handleNavigateToShow(id) {
    navigation.navigate('AquariumShow', { aquariumId: id });
  }
  function handleNavigateToCreate() {
    navigation.navigate('AquariumCreate', { aquariumId: 0 });
  }

  return (
    <>
      <View style={styles.containerContent}>
        <Loading show={isLoading} color={'#0055AA'} size={'large'} />
        <View>
          {aquariums.length <= 0 && isLoading !== true ? (
            <Text style={{ color: '#000', alignSelf: 'center' }}>
              Nenhum aquário cadastrado.
            </Text>
          ) : (
            <FlatList
              data={aquariums}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <SwipeableList
                  data={item}
                  handleDelete={handleDeleteAquarium}
                  handleEdit={handleEditAquarium}
                  handleShow={handleNavigateToShow}
                  onOpen={onOpen}
                  onClose={onClose}
                  icon="fishbowl-outline">
                  <View style={styles.textsCard}>
                    <Text style={styles.titleCard}>{item.name}</Text>
                    <Text style={styles.dataCard}>
                      {Math.round(
                        (item.length * item.height * item.width) / 1000,
                      )}{' '}
                      litros
                    </Text>
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
  dataCard: {
    color: '#334455',
    fontFamily: 'Roboto-Light',
    fontSize: 14,
  },

  titleCard: {
    color: '#334455',
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    paddingBottom: 4,
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

export default AquariumIndex;
