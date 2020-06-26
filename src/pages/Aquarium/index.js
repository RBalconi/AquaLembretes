import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  ToastAndroid,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import getRealm from '../../services/realm';

import FishBowlOutline from '../../components/icons/fishbowl-outline.js';

const Remember = () => {
  const navigation = useNavigation();

  const [aquariums, setAquariums] = useState([]);

  async function deleteAquarium(id) {
    const realm = await getRealm();
    try {
      const deletingAquarium = realm
        .objects('Aquarium')
        .filtered(`id = '${id}'`);

      realm.write(() => {
        realm.delete(deletingAquarium);
      });
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        'Ocorreu um erro ao excluir!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  }

  function handleDeleteAquarium(aquarium) {
    Alert.alert(
      'Excluir',
      `Tem certeza que deseja excluir "${aquarium.aquarium.name}"?`,
      [
        {
          text: 'Sim',
          onPress: () => {
            deleteAquarium(aquarium.aquarium.id);
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
    const realm = await getRealm();
    const data = realm.objects('Aquarium').sorted('name', false);
    setAquariums(data);
  }

  useEffect(() => {
    async function startListenerRefreshAquarium() {
      const realm = await getRealm();
      realm.addListener('change', () => setAquariumsRealm());
    }
    async function removeListenerRefreshAquarium() {
      const realm = await getRealm();
      realm.removeListener('change', () => setAquariumsRealm());
    }

    startListenerRefreshAquarium();
    return () => {
      removeListenerRefreshAquarium();
    };
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToShow(id) {
    navigation.navigate('AquariumShow', { aquariumId: id });
  }

  function handleNavigateToCreate() {
    navigation.navigate('AquariumCreate');
  }

  const SwipeableRightActions = aquarium => {
    return (
      <View style={styles.containerSwipeable}>
        <RectButton style={styles.containerItemSwipeable} onPress={() => {}}>
          <MaterialCommunityIcons
            name="file-document-edit-outline"
            size={30}
            color="#0055AA"
          />
          <Text>Editar</Text>
        </RectButton>
        <RectButton
          style={styles.containerItemSwipeable}
          onPress={() => handleDeleteAquarium(aquarium)}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={30}
            color="#0055AA"
          />
          <Text>Deletar</Text>
        </RectButton>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={{ flex: 1, backgroundColor: '#0055AA' }}>
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <View style={{ justifyContent: 'space-between' }}>
              <View style={{ flex: 1, flexWrap: 'wrap' }}>
                <TouchableOpacity
                  style={styles.buttonBack}
                  onPress={handleNavigateBack}
                  activeOpacity={0.6}>
                  <MaterialCommunityIcons
                    name="chevron-left"
                    size={24}
                    color="#0055AA"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Aquários</Text>
            </View>

            <Image
              style={styles.imageHeader}
              source={require('../../assets/images/aquarium.png')}
            />
          </View>
        </View>
        <View style={styles.containerContent}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 20 }}>
            {aquariums.map(aquarium => (
              <View key={aquarium.id} style={styles.containerCardRemember}>
                <Swipeable
                  renderRightActions={id => (
                    <SwipeableRightActions aquarium={aquarium} />
                  )}>
                  <RectButton
                    style={styles.cardRemember}
                    onPress={() => handleNavigateToShow(aquarium.id)}>
                    <View style={styles.iconCard}>
                      <FishBowlOutline
                        width={50}
                        height={50}
                        fill={'#0055AA'}
                      />
                    </View>
                    <View style={styles.textsCard}>
                      <Text style={styles.titleCard}>{aquarium.name}</Text>
                      <Text style={styles.dataCard}>
                        {aquarium.length * aquarium.height * aquarium.width}{' '}
                        litros
                      </Text>
                    </View>
                  </RectButton>
                </Swipeable>
              </View>
            ))}
          </ScrollView>
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
  buttonBack: {
    flexWrap: 'wrap',
    padding: 6,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },

  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    minHeight: 180,
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontFamily: 'Ubuntu-Medium',
    marginBottom: 40,
  },
  imageHeader: {},

  containerContent: {
    flex: 1,
    backgroundColor: '#f0f0f5',
    borderTopStartRadius: 40,
    padding: 20,
    paddingBottom: 0,
  },

  containerCardRemember: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 20,
  },
  cardRemember: {
    borderRadius: 20,

    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 20,
  },

  titleCard: {
    color: '#334455',
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    paddingBottom: 4,
  },
  iconCard: {
    paddingLeft: 10,
    paddingRight: 30,
    alignSelf: 'center',
  },
  textsCard: {
    flex: 1,
    alignContent: 'space-between',
  },
  detailsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataCard: {
    color: '#334455',
    fontFamily: 'Roboto-Light',
    fontSize: 14,
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
  containerSwipeable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
  },
  containerItemSwipeable: {
    marginLeft: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default Remember;
