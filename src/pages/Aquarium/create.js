import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  useRoute,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';

import getRealm from '../../services/realm';

import TextInput from '../../components/inputText';
import Button from '../../components/button';

const AquariumCreate = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const routeParams = route.params;

  const lengthInput = useRef(null);
  const widthInput = useRef(null);
  const heightInput = useRef(null);

  const [data, setData] = useState({
    id: '',
    name: '',
    image: '',
    length: '',
    width: '',
    height: '',
  });

  const [imageGalery, setImageGalery] = useState({
    uri: '',
    fileName: '',
    path: '',
  });

  const [error, setError] = useState({
    image: false,
    name: false,
    length: false,
    width: false,
    height: false,
  });

  async function loadAquarium(id) {
    const realm = await getRealm();
    const loadedAquarium = realm.objectForPrimaryKey('Aquarium', id);

    return loadedAquarium;
  }

  function validateInputsToSave() {
    const temp = { ...error };
    let erro;
    for (erro in error) {
      temp[erro] = !data[erro];
      setError(temp);
    }
    for (erro in temp) {
      if (temp[erro]) {
        return true;
      }
    }
  }

  useEffect(() => {
    if (routeParams.aquariumId !== 0) {
      loadAquarium(routeParams.aquariumId).then(response => {
        setData({
          id: response.id,
          name: String(response.name),
          image: String(response.imageName),
          length: String(response.length),
          width: String(response.width),
          height: String(response.height),
        });
        setImageGalery({ uri: String(response.imageName) });
      });
    }
  }, [routeParams.aquariumId]);

  useEffect(() => {
    async function loadID() {
      const realm = await getRealm();
      if (!data.id) {
        const lastAquarium = realm.objects('Aquarium').sorted('id', true)[0];
        const highestId = lastAquarium == null ? 0 : lastAquarium.id;
        const newId = highestId == null ? 1 : highestId + 1;
        setData({ ...data, id: newId });
      }
    }
    loadID();
  }, [data]);

  async function saveAquarium() {
    const realm = await getRealm();

    realm.write(() => {
      realm.create(
        'Aquarium',
        {
          id: data.id,
          name: data.name,
          imageName: data.image,
          length: parseFloat(data.length),
          width: parseFloat(data.width),
          height: parseFloat(data.height),
        },
        'modified',
      );
    });
  }

  async function createPathPhoto() {
    const destPath = RNFS.ExternalDirectoryPath + '/imagesAquariums';
    !(await RNFS.exists(destPath)) && (await RNFS.mkdir(destPath));
    return;
  }

  async function generateFileToPath(file) {
    const date = new Date();
    const time =
      date.getDate() +
      date.getMonth() +
      date.getFullYear() +
      date.getHours() +
      date.getMinutes() +
      date.getSeconds();

    const destPath =
      RNFS.ExternalDirectoryPath + '/imagesAquariums/' + time + file.fileName;
    return destPath;
  }

  function launchImageLibrary() {
    const options = {
      title: 'Foto do aquário',
      customButtons: [{ name: 'aqua', title: 'Selecione a foto do aquário.' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      noData: true,
    };

    ImagePicker.launchImageLibrary(options, async response => {
      if (!(response.didCancel || response.error)) {
        const imageUri = await generateFileToPath(response);

        setData({ ...data, image: 'file://' + imageUri });
        setImageGalery({
          uri: response.uri,
          fileName: response.fileName,
          path: response.path,
        });
      }
    });
  }

  function handleChoosePhoto() {
    launchImageLibrary();
  }

  async function handleAddAquarium() {
    const invalidated = validateInputsToSave();
    if (invalidated) {
      ToastAndroid.showWithGravityAndOffset(
        'Ops, ocorreu um erro!\nPor favor preencha todos os campos.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return;
    }

    await createPathPhoto();
    if (routeParams.aquariumId !== 0) {
      loadAquarium(data.id).then(async resp => {
        if (await RNFS.exists(String(resp.imageName))) {
          if (data.image && imageGalery.path) {
            await RNFS.unlink(String(resp.imageName));
          }
        }
      });
    }
    if (data.image && imageGalery.path) {
      await RNFS.copyFile(imageGalery.path, data.image);
    }

    saveAquarium();

    if (routeParams.aquariumId !== 0) {
      navigation.navigate('AquariumShow', { aquariumId: data.id });
      navigation.dispatch(state => {
        const routes = state.routes.filter(r => r.name !== 'AquariumCreate');
        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      });
    }

    setData({
      id: '',
      name: '',
      image: '',
      length: '',
      width: '',
      height: '',
    });

    setImageGalery({
      uri: '',
      fileName: '',
      path: '',
    });

    ToastAndroid.showWithGravityAndOffset(
      'Salvo com sucesso!',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    Keyboard.dismiss();
  }

  const handleInputOnlyNumbers = text => {
    if (/^[\d,.]+$/.test(text) || text === '') {
      return text;
    }
  };

  return (
    <>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.inputImage, error.image && styles.inputError]}>
          <RectButton
            style={{ flex: 1, justifyContent: 'center' }}
            onPress={handleChoosePhoto}>
            <View style={{ alignItems: 'center' }}>
              {imageGalery.uri ? (
                <Image
                  source={{ uri: imageGalery.uri }}
                  style={styles.photoAquarium}
                />
              ) : (
                <>
                  <MaterialCommunityIcons
                    name="upload-outline"
                    size={40}
                    color="#AFAFAF"
                  />
                  <Text style={{ color: '#AFAFAF', fontSize: 15 }}>
                    Selecionar foto.
                  </Text>
                </>
              )}
            </View>
          </RectButton>
        </View>

        <TextInput
          placeholder="Nome"
          returnKeyType="next"
          value={data.name}
          onChangeText={text => setData({ ...data, name: text })}
          onSubmitEditing={() => lengthInput.current.focus()}
          error={error.name}
        />
        <TextInput
          placeholder="Comprimento (cm)"
          keyboardType="numeric"
          returnKeyType="next"
          ref={lengthInput}
          onSubmitEditing={() => widthInput.current.focus()}
          value={data?.length ?? ''}
          onChangeText={text => {
            setData({ ...data, length: handleInputOnlyNumbers(text) });
          }}
          error={error.length}
        />

        <TextInput
          placeholder="Largura (cm)"
          keyboardType="numeric"
          returnKeyType="next"
          ref={widthInput}
          onSubmitEditing={() => heightInput.current.focus()}
          value={data?.width ?? ''}
          onChangeText={text =>
            setData({ ...data, width: handleInputOnlyNumbers(text) })
          }
          error={error.width}
        />
        <TextInput
          placeholder="Altura (cm)"
          keyboardType="numeric"
          returnKeyType="done"
          ref={heightInput}
          value={data.height ?? ''}
          onChangeText={text =>
            setData({ ...data, height: handleInputOnlyNumbers(text) })
          }
          onSubmitEditing={() => Keyboard.dismiss()}
          error={error.height}
        />
        <Button
          onPress={handleAddAquarium}
          text="Salvar"
          iconName="arrow-right"
        />
      </KeyboardAwareScrollView>
    </>
  );
};
const styles = StyleSheet.create({
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
  inputError: {
    borderColor: '#0055AA',
    borderWidth: 2,
  },
});

export default AquariumCreate;
