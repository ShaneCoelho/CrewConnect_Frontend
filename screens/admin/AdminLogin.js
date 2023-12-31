import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground, Image, Alert } from 'react-native';
import { SafeAreaView, StatusBar, Platform, BackHandler } from 'react-native';

const AdminLogin = ({navigation,navigation:{goBack}}) => {

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const handleLogin = () => {
  //   // Perform login logic here
  //   console.log('Login pressed');

  //   navigation.navigate('AdminDrawer');
  // };

  const handleLogin = async () => {
    try {
      const response = await fetch('https://crewconnect.onrender.com/adminlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === 'Login successful') {
          // Navigate to another screen if credentials are correct
          navigation.navigate('AdminDrawer');
        } else {
          // Display an alert for incorrect credentials
          Alert.alert('Error', 'Enter proper username and password');
        }
      } else {
        // Handle non-200 status codes, e.g., network issues
        Alert.alert('Error', 'Enter proper username and password');
      }
    } catch (error) {
      console.error(error);
      // Handle other errors here
    }
  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <ImageBackground
      source={require('../../assets/images/Background.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image source={require('../../assets/images/CMOTS_Logo.jpg')} style={styles.logo} resizeMode="contain" />
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        
      </View>
    </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 255)',
    padding: 16,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  signUpLink: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default AdminLogin;
