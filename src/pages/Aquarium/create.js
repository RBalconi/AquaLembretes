import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import getRealm from '../../services/realm';
import RNFS from 'react-native-fs';

const AquariumCreate = () => {
  const route = useRoute();
  const routeParams = route.params;

  const lengthInput = useRef(null);
  const widthInput = useRef(null);
  const heightInput = useRef(null);

  const [data, setData] = useState({
    id: '',
    name: '',
    imageName: '',
    length: '',
    width: '',
    height: '',
  });

  async function loadAquarium(id) {
    const realm = await getRealm();
    const loadedAquarium = realm.objectForPrimaryKey('Aquarium', id);

    return loadedAquarium;
  }

  useEffect(() => {
    if (routeParams.aquariumId !== 0) {
      loadAquarium(routeParams.aquariumId).then(response => {
        setData({
          id: response.id,
          name: String(response.name),
          imageName: { uri: String(response.imageName) },
          length: String(response.length),
          width: String(response.width),
          height: String(response.height),
        });
        // console.log('useEffect::: ' + JSON.stringify(data, null, 2));
      });
    }
  }, [routeParams.aquariumId]);

  async function saveAquarium() {
    const realm = await getRealm();

    if (!data.id) {
      const lastAquarium = realm.objects('Aquarium').sorted('id', true)[0];
      const highestId = lastAquarium == null ? 0 : lastAquarium.id;
      const newId = highestId == null ? 1 : highestId + 1;
      data.id = newId;
      setData({ data });
    }

    if (data.imageName.fileName) {
      const imageName = await createPathPhoto(data.imageName);
      data.imageName.uri = 'file://' + imageName;
      setData({ data });
    }

    realm.write(() => {
      realm.create(
        'Aquarium',
        {
          id: data.id,
          name: data.name,
          imageName: data.imageName.uri,
          length: parseFloat(data.length),
          width: parseFloat(data.width),
          height: parseFloat(data.height),
        },
        'modified',
      );
    });
  }

  async function createPathPhoto(file) {
    const date = new Date();
    const time =
      date.getHours() + '' + date.getMinutes() + '' + date.getSeconds();

    const destPath = RNFS.ExternalDirectoryPath + '/imagesAquariums';
    const finalPath = destPath + '/' + time + file.fileName;

    if ((await RNFS.exists(destPath)) === false) {
      RNFS.mkdir(destPath);
    }

    RNFS.copyFile(file.path, finalPath);
    return finalPath;
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
        setData({
          ...data,
          imageName: {
            uri: response.uri,
            fileName: response.fileName,
            path: response.path,
          },
        });
      }
    });
  }

  function handleAddAquarium() {
    try {
      saveAquarium();
      setData({
        id: '',
        name: '',
        imageName: '',
        length: '',
        width: '',
        height: '',
      });
      ToastAndroid.showWithGravityAndOffset(
        'Salvo com sucesso!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      Keyboard.dismiss();
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
  const handleInputValidate = text => {
    if (/^[\d,.]+$/.test(text) || text === '') {
      return text;
    }
  };

  return (
    <>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <RectButton style={styles.inputImage} onPress={handleChoosePhoto}>
          <View style={{ alignItems: 'center' }}>
            {data.imageName ? (
              <Image
                source={{ uri: data.imageName.uri }}
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
        <TextInput
          style={styles.input}
          placeholder="Nome"
          returnKeyType={'next'}
          onSubmitEditing={() => lengthInput.current.focus()}
          value={data.name}
          onChangeText={text => setData({ ...data, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Comprimento (cm)"
          keyboardType="numeric"
          returnKeyType="next"
          ref={lengthInput}
          onSubmitEditing={() => widthInput.current.focus()}
          value={data?.length ?? ''}
          onChangeText={text => {
            setData({ ...data, length: handleInputValidate(text) });
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Largura (cm)"
          keyboardType="numeric"
          returnKeyType="next"
          ref={widthInput}
          onSubmitEditing={() => heightInput.current.focus()}
          value={data?.width ?? ''}
          onChangeText={text =>
            setData({ ...data, width: handleInputValidate(text) })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Altura (cm)"
          keyboardType="numeric"
          returnKeyType="done"
          ref={heightInput}
          value={data.height ?? ''}
          onChangeText={text =>
            setData({ ...data, height: handleInputValidate(text) })
          }
        />
        <RectButton style={styles.button} onPress={handleAddAquarium}>
          <View style={styles.buttonIcon}>
            <MaterialCommunityIcons name="arrow-right" color="#FFF" size={24} />
          </View>
          <Text style={styles.buttonText}>Salvar</Text>
        </RectButton>
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

export default AquariumCreate;
