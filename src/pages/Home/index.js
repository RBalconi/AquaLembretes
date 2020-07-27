import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Appearance,
  useColorScheme,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const theme = useColorScheme();

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
          <Text style={styles.descriptionRemember}>NPK Plus MBreda</Text>
          <Text style={styles.descriptionRemember}>Aquário Principal</Text>
          <View style={styles.lineIcon}>
            <MaterialCommunityIcons
              name="clock-alert"
              size={18}
              color="#FFF"
              style={{ paddingRight: 5 }}
            />
            <Text style={styles.descriptionRemember}>20:00 - 11 de junho.</Text>
          </View>
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

const stylesdark = StyleSheet.create({
  title: {
    color: '#FFF',
  },
  container: {
    backgroundColor: '#334455',
  },
});

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
  },
  lineIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageCardRemember: {
    position: 'absolute',
    right: -30,
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
