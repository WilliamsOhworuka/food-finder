/* eslint-disable react-native/no-inline-styles */
import React, {useState, createRef, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {TouchableRipple, useTheme} from 'react-native-paper';
import EditProfileModal from '../components/EditProfileModal';
import {Context} from '../context/AuthContext';

const EditProfileScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fields, setFields] = useState({
    'First name': 'John',
    'Last name': 'Doe',
    Phone: '',
    Email: 'john.doe@gmail.com',
    Country: '',
    City: '',
  });

  const {
    state: {profileImage},
    setProfileImage,
  } = useContext(Context);

  const [modalField, setModalField] = useState(null);
  const {colors} = useTheme();

  const bs = createRef();
  const fall = new Animated.Value(1);

  const handlePress = (field) => () => {
    setModalField({
      title: field,
      value: fields[field],
      currentValue: fields[field],
    });

    setModalVisible(true);
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxHeight: 300,
      compressImageMaxWidth: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      setProfileImage(image.path);
      bs.current.snapTo(1);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      compressImageMaxHeight: 300,
      compressImageMaxWidth: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      setProfileImage(image.path);
      bs.current.snapTo(1);
    });
  };

  const renderHeader = () => (
    <View style={{overflow: 'hidden', paddingTop: 20}}>
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
      </View>
    </View>
  );

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        initialSnap={1}
        renderContent={renderInner}
        renderHeader={renderHeader}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <EditProfileModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setModalField={setModalField}
        field={modalField}
        setFields={setFields}
      />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
        }}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={{
                  uri: profileImage,
                }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View style={styles.imageIconContainer}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={styles.imageIcon}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={[styles.nametag, {color: colors.text}]}>John Doe</Text>
        </View>
        <View
          style={{marginTop: 20, borderTopWidth: 1, borderTopColor: '#f7f7f7'}}>
          <TouchableRipple onPress={handlePress('First name')}>
            <View style={styles.field}>
              <Text style={{color: colors.text}}>First name</Text>
              <Text style={{color: '#999797'}}>{fields['First name']}</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple name="Last name" onPress={handlePress('Last name')}>
            <View style={styles.field}>
              <Text style={{color: colors.text}}>Last name</Text>
              <Text style={{color: '#999797'}}>{fields['Last name']}</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple name="Phone" onPress={handlePress('Phone')}>
            <View style={styles.field}>
              <Text style={{color: colors.text}}>Phone</Text>
              <Text style={{color: '#999797'}}>{fields.Phone}</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple name="Email" onPress={handlePress('Email')}>
            <View style={styles.field}>
              <Text style={{color: colors.text}}>Email</Text>
              <Text style={{color: '#999797'}}>{fields.Email}</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple name="Country" onPress={handlePress('Country')}>
            <View style={styles.field}>
              <Text style={{color: colors.text}}>Country</Text>
              <Text style={{color: '#999797'}}>{fields.Country}</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple name="City" onPress={handlePress('City')}>
            <View style={styles.field}>
              <Text style={{color: colors.text}}>City</Text>
              <Text style={{color: '#999797'}}>{fields.City}</Text>
            </View>
          </TouchableRipple>
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={() => {}}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  field: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingVertical: 20,
    borderBottomColor: '#f0eded',
    paddingHorizontal: 10,
  },
  nametag: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIcon: {
    opacity: 0.7,
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // elevation: 10,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 7,
    paddingTop: 20,
    marginBottom: Platform.OS === 'android' ? -10 : 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});

export default EditProfileScreen;
