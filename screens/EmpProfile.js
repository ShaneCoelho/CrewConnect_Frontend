import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView, StatusBar, Platform, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

const EmpProfile = ({navigation,navigation:{goBack}}) => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const employeeName = 'Shane Coelho';

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
  }, [profilePhoto]);

  const handleLogout = () => {
    AsyncStorage.clear().then(()=>{
        navigation.navigate("Home")
      })
  };

  const selectProfilePhoto = async () => {
    const token = await AsyncStorage.getItem('token');


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
      console.log(uri)


    const fileInfo = await FileSystem.getInfoAsync(uri);
    const filename = fileInfo.uri.split('/').pop();
    console.log(filename)


     // Set the content type based on the file extension
     const extension = filename.split('.').pop();
     const contentType = `image/${extension}`;
     console.log(contentType)

      formData.append('file', {
        uri: uri,
      name: filename,
      type: contentType,
      });

      console.log(formData)

      // Make an API request to update the profile photo
      fetch("https://213a-45-114-251-176.ngrok-free.app/avatar", {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  const fetchProfilePhoto = async() => {

    const token = await AsyncStorage.getItem('token');
    // Make an API request to fetch the profile photo
    try{
    const response= await fetch("https://213a-45-114-251-176.ngrok-free.app/fetchavatar", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
    const blob = await response.blob();
    const uri = URL.createObjectURL(blob);
    console.log(uri)
    setProfilePhoto({uri});
  }else{
    console.log('Error:', response.status);
  }
}catch(error){
    console.log(error);
  }
      
  };

  const handlePersonalInfoPress = () => {
    // Navigate to the specified screen based on screenName
    // You can use React Navigation or any other navigation library here
    navigation.navigate('EmpPersonalInfo');
  };

  const handlePastLeavePress = () => {
    // Navigate to the specified screen based on screenName
    // You can use React Navigation or any other navigation library here
    navigation.navigate('EmpPastLeave');
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
          onPress={handlePersonalInfoPress}
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
          onPress={handlePastLeavePress}
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
