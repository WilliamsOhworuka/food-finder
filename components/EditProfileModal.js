/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  View,
} from 'react-native';
import {TouchableRipple, useTheme} from 'react-native-paper';

const {width, height} = Dimensions.get('window');
const modalWidth = width * 0.85;
const modalHeight = height * 0.26;

const EditProfileModal = ({
  modalVisible,
  setModalVisible,
  field,
  setModalField,
  setFields,
}) => {
  const {colors, dark} = useTheme();

  const handleCancel = () => {
    setModalField({...field, value: field.currentValue});
    setModalVisible(false);
  };

  const handleOk = () => {
    setFields((prev) => ({...prev, [field.title]: field.value}));
    setModalVisible(false);
  };

  const handleChange = (text) => setModalField({...field, value: text});

  const getKeyboardType = () => {
    if (!field) {
      return;
    } else if (field.title === 'Phone') {
      return 'phone-pad';
    } else if (field.title === 'Email') {
      return 'email-address';
    } else {
      return 'default';
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            {backgroundColor: dark ? '#424242' : 'white'},
          ]}>
          <View style={styles.offsetHorizontal}>
            <Text style={[styles.title, {color: colors.text}]}>
              {field && field.title}
            </Text>
            <Text style={styles.label}>{field && field.title}</Text>
            <TextInput
              autoCapitalize="none"
              onChangeText={handleChange}
              autoCorrect={false}
              autoFocus
              keyboardType={getKeyboardType()}
              style={[styles.input, {color: colors.text}]}
              value={field && field.value}
            />
            <Text style={styles.wordCount}>
              {field && field.value ? field.value.length : 0}/100
            </Text>
          </View>
          <View style={styles.footer}>
            <TouchableRipple
              style={[styles.button, {marginRight: 5}]}
              rippleColor="rgba(66, 135, 245, 0.1)"
              onPress={handleCancel}>
              <Text style={{color: '#999797'}}>CANCEL</Text>
            </TouchableRipple>
            <TouchableRipple
              style={styles.button}
              rippleColor="rgba(66, 135, 245, 0.1)"
              onPress={handleOk}>
              <Text style={{color: '#4287f5'}}>OK</Text>
            </TouchableRipple>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 30,
    fontWeight: '700',
  },
  offsetHorizontal: {
    paddingHorizontal: 25,
  },
  label: {
    fontSize: 12,
    color: '#4287f5',
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  wordCount: {
    alignSelf: 'flex-end',
    marginRight: 15,
    color: '#999797',
    marginTop: 2,
  },
  footer: {
    marginTop: 30,
    marginRight: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  input: {
    borderBottomColor: '#4287f5',
    fontSize: 17,
    paddingHorizontal: 0,
    paddingBottom: 2,
    paddingTop: 0,
    borderBottomWidth: 2,
  },
  centeredView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    paddingVertical: 25,
    backgroundColor: 'white',
    width: modalWidth,
    height: modalHeight,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default EditProfileModal;
