import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import getRealm from '../../services/realm';
import RNFS from 'react-native-fs';

import SwipeableList from '../../components/swipeableList';
import Loading from '../../components/loading';
import Header from '../../components/header';

const AquariumIndex = () => {
  const navigation = useNavigation();

  const [aquariums, setAquariums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
  }
  async function removeListenerRefreshAquarium() {
    const realm = await getRealm();
    realm.removeListener('change', () => {});
  }
  const startListenerRefreshAquarium = useCallback(async () => {
    const realm = await getRealm();
    realm.addListener('change', () => setAquariumsRealm());
  }, []);

  useEffect(() => {
    startListenerRefreshAquarium();
    setAquariumsRealm();
    return () => {
      removeListenerRefreshAquarium();
      setAquariumsRealm();
    };
  }, [startListenerRefreshAquarium]);

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
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={{ flex: 1, backgroundColor: '#0055AA' }}>
        <View style={styles.container}>
          <Header title={'Aquários'} animation={'aquarium'} />
        </View>
        <View style={styles.containerContent}>
          <Loading show={isLoading} color={'#0055AA'} size={'large'} />
          <View>
            <FlatList
              data={aquariums}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <SwipeableList
                  data={item}
                  handleDelete={handleDeleteAquarium}
                  handleEdit={handleEditAquarium}
                  handleShow={handleNavigateToShow}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.floattingButton}
        onPress={handleNavigateToCreate}
        activeOpacity={0.6}>
        <MaterialCommunityIcons name="plus" size={44} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
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
    padding: 20,
    paddingBottom: 0,
  },

  floattingButton: {
    position: 'absolute',
    width: 57,
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
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
