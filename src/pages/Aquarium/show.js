import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import getRealm from '../../services/realm';

const AquariumShow = () => {
  const [data, setData] = useState({});

  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params;

  async function loadAquarium(id) {
    const realm = await getRealm();
    const loadedAquarium = realm.objectForPrimaryKey('Aquarium', id);

    return loadedAquarium;
  }

  useEffect(() => {
    loadAquarium(routeParams.aquariumId).then(response => {
      setData(response);
    });
  }, [routeParams.aquariumId]);

  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <>
      <Image
        style={styles.photoAquarium}
        source={{
          uri: `file://${data.imageName}`,
        }}
      />
      <View>
        <Text style={styles.titleContent}>{data.name}</Text>
        <View style={styles.measuresContainer}>
          <View>
            <Text style={styles.measuresTitle}>Comprimento</Text>
            <Text style={styles.measuresDetail}>
              {Math.round(data.length)} cm
            </Text>
          </View>
          <View>
            <Text style={styles.measuresTitle}>Largura</Text>
            <Text style={styles.measuresDetail}>
              {Math.round(data.width)} cm
            </Text>
          </View>
          <View>
            <Text style={styles.measuresTitle}>Altura</Text>
            <Text style={styles.measuresDetail}>
              {Math.round(data.height)} cm
            </Text>
          </View>
        </View>
        <View style={styles.measuresContainer}>
          <View>
            <Text style={styles.measuresTitle}>Litragem</Text>
            <Text style={styles.measuresDetail}>
              {Math.round((data.length * data.height * data.width) / 1000)}{' '}
              Litros
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  photoAquarium: {
    width: '100%',
    height: 170,
    resizeMode: 'cover',
    borderRadius: 40,
  },

  titleContent: {
    color: '#334455',
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    paddingVertical: 14,
  },
  measuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  measuresTitle: {
    color: '#334455',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
  measuresDetail: {
    color: '#778899',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
});

export default AquariumShow;
