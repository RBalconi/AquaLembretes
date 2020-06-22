import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Remember = () => {
  const navigation = useNavigation();

  function handleNavigateBack() {
    navigation.goBack();
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
          <Image
            style={styles.photoAquarium}
            source={require('../../assets/images/photoaquarium.jpg')}
          />
          <View>
            <Text style={styles.titleContent}>Aquário Principal</Text>
            <View style={styles.measuresContainer}>
              <View>
                <Text style={styles.measuresTitle}>Comprimento</Text>
                <Text style={styles.measuresDetail}>75 cm</Text>
              </View>
              <View>
                <Text style={styles.measuresTitle}>Largura</Text>
                <Text style={styles.measuresDetail}>35 cm</Text>
              </View>
              <View>
                <Text style={styles.measuresTitle}>Altura</Text>
                <Text style={styles.measuresDetail}>45 cm</Text>
              </View>
            </View>
            <View style={styles.measuresContainer}>
              <View>
                <Text style={styles.measuresTitle}>Litragem</Text>
                <Text style={styles.measuresDetail}>118 Litros</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
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
    // flex: 1,
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

export default Remember;
