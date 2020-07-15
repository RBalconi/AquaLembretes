import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';

function Header(props) {
  const navigation = useNavigation();

  const animations = {
    aquarium: require('../assets/animations/aquarium-anim.json'),
    // animation2: require('../assets/animations/'),
  };

  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
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
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <LottieView
        style={styles.animationHeader}
        source={animations[props.animation]}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    minHeight: 180,
  },

  buttonBack: {
    flexWrap: 'wrap',
    padding: 6,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },

  animationHeader: {
    alignSelf: 'flex-end',
    right: -60,
    zIndex: -1,
  },

  title: {
    color: '#FFF',
    fontSize: 28,
    fontFamily: 'Ubuntu-Medium',
    marginBottom: 40,
  },
});

export default Header;
