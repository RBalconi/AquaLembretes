import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const RememberIndex = () => {
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
              <Text style={styles.title}>Lembretes</Text>
            </View>

            <Image
              style={styles.imageHeader}
              source={require('../../assets/images/clock-remember.png')}
            />
          </View>
        </View>
        <View style={styles.containerContent}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: 20,
            }}>
            <View style={styles.cardRemember}>
              <View style={styles.iconCard}>
                <MaterialCommunityIcons name="leaf" size={50} color="#0055AA" />
              </View>
              <View style={styles.textsCard}>
                <Text style={styles.titleCard}>Colocar Fertilizante</Text>
                <Text style={styles.descriptionCard}>Aquário Principal</Text>
                <View style={styles.detailsCard}>
                  <Text style={styles.dataCard}>2 ml.</Text>
                  <Text style={styles.dataCard}>20:00 - 11 de junho.</Text>
                </View>
              </View>
            </View>

            <View style={styles.cardRemember}>
              <View style={styles.iconCard}>
                <MaterialCommunityIcons
                  name="flask-outline"
                  size={50}
                  color="#0055AA"
                />
              </View>
              <View style={styles.textsCard}>
                <Text style={styles.titleCard}>Colocar remedio</Text>
                <Text style={styles.descriptionCard}>Aquário Hospital</Text>
                <View style={styles.detailsCard}>
                  <Text style={styles.dataCard}>2 gotas.</Text>
                  <Text style={styles.dataCard}>20:00 - 11 de junho.</Text>
                </View>
              </View>
            </View>

            <View style={styles.cardRemember}>
              <View style={styles.iconCard}>
                <MaterialCommunityIcons
                  name="food-variant"
                  size={50}
                  color="#0055AA"
                />
              </View>
              <View style={styles.textsCard}>
                <Text style={styles.titleCard}>Colocar suplemento</Text>
                <Text style={styles.descriptionCard}>Aquário Principal</Text>
                <View style={styles.detailsCard}>
                  <Text style={styles.dataCard}>2 gr.</Text>
                  <Text style={styles.dataCard}>20:00 - 11 de junho.</Text>
                </View>
              </View>
            </View>

            <View style={styles.cardRemember}>
              <View style={styles.iconCard}>
                <MaterialCommunityIcons
                  name="water"
                  size={50}
                  color="#0055AA"
                />
              </View>
              <View style={styles.textsCard}>
                <Text style={styles.titleCard}>Fazer TPA</Text>
                <Text style={styles.descriptionCard}>Aquário Principal</Text>
                <View style={styles.detailsCard}>
                  <Text style={styles.dataCard}>20 L.</Text>
                  <Text style={styles.dataCard}>20:00 - 11 de junho.</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity
        style={styles.floattingButton}
        onPress={() => {}}
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

  cardRemember: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  titleCard: {
    color: '#334455',
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    paddingBottom: 4,
  },
  descriptionCard: {
    color: '#7C8893',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    paddingBottom: 5,
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
});

export default RememberIndex;
