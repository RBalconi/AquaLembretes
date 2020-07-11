import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FishBowlOutline from '../components/icons/fishbowl-outline';

const SwipeableRightActions = ({ data, handleDelete, handleEdit }) => {
  return (
    <View style={styles.containerSwipeable}>
      <RectButton
        style={styles.containerItemSwipeable}
        onPress={() => handleEdit(data)}>
        <MaterialCommunityIcons
          name="file-document-edit-outline"
          size={30}
          color="#0055AA"
        />
        <Text>Editar</Text>
      </RectButton>

      <RectButton
        style={styles.containerItemSwipeable}
        onPress={() => handleDelete(data)}>
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

function SwipeableList({ data, handleShow, handleDelete, handleEdit }) {
  return (
    <View style={styles.containerCardRemember}>
      <Swipeable
        renderRightActions={id => (
          <SwipeableRightActions
            data={data}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        )}>
        <RectButton
          style={styles.cardRemember}
          onPress={() => handleShow(data.id)}>
          <View style={styles.iconCard}>
            <FishBowlOutline width={50} height={50} fill={'#0055AA'} />
          </View>
          <View style={styles.textsCard}>
            <Text style={styles.titleCard}>{data.name}</Text>

            {data.length && data.height && data.width && (
              <Text style={styles.dataCard}>
                {data.length * data.height * data.width} litros
              </Text>
            )}
            {/* {data.time && (
              <Text style={styles.dataCard}>20:00 - 11 de junho.</Text>
            )} */}
          </View>
        </RectButton>
      </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
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
    overflow: 'hidden',
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
export default SwipeableList;
