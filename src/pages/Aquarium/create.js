import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';

import getRealm from '../../services/realm';

const Remember = () => {
  const navigation = useNavigation();

  const lengthInput = useRef(null);
  const widthInput = useRef(null);
  const heightInput = useRef(null);

  const [imageStateInput, setImageStateInput] = useState();
  const [nameStateInput, setNameStateInput] = useState();
  const [lengthStateInput, setLengthStateInput] = useState();
  const [widthStateInput, setWidthStateInput] = useState();
  const [heightStateInput, setHeightStateInput] = useState();

  const data = {
    id: null,
    name: nameStateInput,
    imageName: 'image-fake.jpg',
    length: Number(lengthStateInput),
    width: Number(widthStateInput),
    height: Number(heightStateInput),
  };

  function clearInputs() {
    // setImageStateInput('');
    setNameStateInput('');
    setLengthStateInput('');
    setWidthStateInput('');
    setHeightStateInput('');
  }

  async function saveAquarium() {
    const realm = await getRealm();

    const lastAquarium = realm.objects('Aquarium').sorted('id', true)[0];
    const highestId = lastAquarium == null ? 0 : lastAquarium.id;
    data.id = highestId == null ? 1 : highestId + 1;

    realm.write(() => {
      realm.create('Aquarium', data);
    });
  }

  function handleAddAquarium() {
    try {
      saveAquarium();
      ToastAndroid.showWithGravityAndOffset(
        'Salvo com sucesso!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      Keyboard.dismiss();
      clearInputs();
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        'Ocorreu um erro!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  }

  function handleChoosePhoto() {
    const options = {
      title: 'Foto do aquário',
      customButtons: [{ name: 'aqua', title: 'Selecione a foto do aquário.' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        setImageStateInput({ response });
      }
    });
  }

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
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <RectButton style={styles.inputImage} onPress={handleChoosePhoto}>
              <View style={{ alignItems: 'center' }}>
                {imageStateInput ? (
                  <Image
                    source={{ uri: imageStateInput.response.uri }}
                    style={styles.photoAquarium}
                  />
                ) : (
                  <>
                    <MaterialCommunityIcons
                      name="upload-outline"
                      size={40}
                      color="#909099"
                    />
                    <Text>Selecionar foto.</Text>
                  </>
                )}
              </View>
            </RectButton>
            <TextInput
              style={styles.input}
              placeholder="Nome do Aquário"
              returnKeyType={'next'}
              onSubmitEditing={() => lengthInput.current.focus()}
              value={nameStateInput}
              onChangeText={setNameStateInput}
            />
            <TextInput
              style={styles.input}
              placeholder="Comprimento (cm)"
              keyboardType={'numeric'}
              returnKeyType={'next'}
              ref={lengthInput}
              onSubmitEditing={() => widthInput.current.focus()}
              value={lengthStateInput}
              onChangeText={setLengthStateInput}
            />
            <TextInput
              style={styles.input}
              placeholder="Largura (cm)"
              keyboardType={'numeric'}
              returnKeyType={'next'}
              ref={widthInput}
              onSubmitEditing={() => heightInput.current.focus()}
              value={widthStateInput}
              onChangeText={setWidthStateInput}
            />
            <TextInput
              style={styles.input}
              placeholder="Altura (cm)"
              keyboardType={'numeric'}
              returnKeyType={'done'}
              ref={heightInput}
              value={heightStateInput}
              onChangeText={setHeightStateInput}
            />
            <RectButton style={styles.button} onPress={handleAddAquarium}>
              <View style={styles.buttonIcon}>
                <MaterialCommunityIcons
                  name="arrow-right"
                  color="#FFF"
                  size={24}
                />
              </View>
              <Text style={styles.buttonText}>Salvar</Text>
            </RectButton>
          </KeyboardAwareScrollView>
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
  inputImage: {
    justifyContent: 'center',
    height: 150,
    backgroundColor: '#FFF',
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  photoAquarium: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4499DD',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 85, 180, 0.5)',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
});

export default Remember;
