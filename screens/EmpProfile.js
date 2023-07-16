import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView, StatusBar, Platform, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmpProfile = ({ navigation }) => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const employeeName = 'John Doe';

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    fetchProfilePhoto();
  }, []);

  const handleLogout = () => {
    AsyncStorage.clear().then(()=>{
        navigation.navigate("Home")
      })
  };

  const selectProfilePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result;
      setProfilePhoto({ uri });

      // Upload the selected profile photo to the server
      const formData = new FormData();
      formData.append('profilePhoto', {
        uri,
        name: 'profilePhoto.jpg',
        type: 'image/jpg',
      });

      // Make an API request to update the profile photo
      fetch("https://e5ff-115-69-246-225.ngrok-free.app/updatephoto", {
        method: 'PUT',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  const fetchProfilePhoto = () => {
    // Make an API request to fetch the profile photo
    fetch("https://e5ff-115-69-246-225.ngrok-free.app/fetchphoto", {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setProfilePhoto({ uri: data.profilePhoto });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigateToScreen = (screenName) => {
    // Navigate to the specified screen based on screenName
    // You can use React Navigation or any other navigation library here
    console.log('Navigating to', screenName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={selectProfilePhoto}>
          <View style={styles.profilePhotoContainer}>
            <Image
              source={profilePhoto || require('./favicon.png')}
              style={styles.profilePhoto}
            />
            <View style={styles.editIcon}>
              <Ionicons name="md-create" size={24} color="#FFF" />
            </View>
          </View>
        </TouchableOpacity>

        <Text style={styles.employeeName}>{employeeName}</Text>

        <TouchableOpacity
          style={styles.menuOptionContainer}
          onPress={() => navigateToScreen('PersonalInfo')}
        >
          <View style={styles.menuOptionIconContainer}>
            <Ionicons name="md-person" size={24} color="#000" />
            <Text style={styles.menuOption}>Personal Info</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuOptionContainer}
          onPress={() => navigateToScreen('MyDocuments')}
        >
          <View style={styles.menuOptionIconContainer}>
            <Ionicons name="md-document" size={24} color="#000" />
            <Text style={styles.menuOption}>My Documents</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuOptionContainer}
          onPress={() => navigateToScreen('PastLeave')}
        >
          <View style={styles.menuOptionIconContainer}>
            <Ionicons name="md-calendar" size={24} color="#000" />
            <Text style={styles.menuOption}>Past Leave</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuOptionContainer}
          onPress={() => navigateToScreen('Salary')}
        >
          <View style={styles.menuOptionIconContainer}>
            <Ionicons name="md-cash" size={24} color="#000" />
            <Text style={styles.menuOption}>Salary</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuOptionContainer}
          onPress={handleLogout}
        >
          <View style={styles.menuOptionIconContainer}>
            <Ionicons name="md-log-out" size={24} color="#FF0000" />
            <Text style={styles.logoutOption}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: windowWidth * 0.1,
  },
  profilePhotoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePhoto: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    borderRadius: (windowWidth * 0.4) / 2,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    borderRadius: 18,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  employeeName: {
    fontSize: 0.05 * windowWidth,
    fontWeight: 'bold',
    marginVertical: 0.04 * windowHeight,
    paddingHorizontal: 20,
  },
  menuOptionContainer: {
    paddingVertical: 0.03 * windowHeight,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  menuOptionIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuOption: {
    fontSize: 0.04 * windowWidth,
    fontWeight: '500',
    color: '#000',
    marginLeft: 0.04 * windowWidth,
  },
  logoutOption: {
    fontSize: 0.04 * windowWidth,
    fontWeight: '500',
    color: '#FF0000',
    marginLeft: 0.04 * windowWidth,
  },
});

export default EmpProfile;
