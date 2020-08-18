import React, { useState } from 'react';
import { StyleSheet, View, Modal, Text, TouchableOpacity } from 'react-native';

function CustomModal({ title, children, onClose = () => {} }) {
  const [modalVisible, setModalVisible] = useState();

  return (
    <Modal animationType="fade" visible={modalVisible} s>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.childrenContainer}>{children}</View>
          <View style={styles.containerButton}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.button}
              onPress={() => {
                onClose();
              }}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.button}
              onPress={() => {
                onClose();
              }}>
              <Text style={styles.buttonText}>Definir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    color: '#0055AA',
    fontSize: 22,
    fontFamily: 'Ubuntu-Medium',
    marginBottom: 18,
  },
  childrenContainer: {
    justifyContent: 'flex-start',
    paddingBottom: 10,
  },
  containerButton: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonText: {
    justifyContent: 'center',
    color: '#0055AA',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    marginLeft: 20,
  },
});

export default CustomModal;
