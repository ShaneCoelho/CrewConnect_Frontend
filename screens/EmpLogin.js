import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView, StatusBar, Platform, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmpLogin = ({ navigation, navigation: { goBack } }) => {
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    console.log('Login pressed');
    setIsLoading(true);

    fetch('https://213a-45-114-251-176.ngrok-free.app/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(res => res.json())
      .then(async data => {
        setIsLoading(false); // Stop loading animation

        console.log(data);
        if (data.error) {
          // Invalid credentials or other error
          Alert.alert('Invalid Credentials', 'Please check your username and password and try again.');
        } else if (data.token) {
          // Successful login
          try {
            await AsyncStorage.setItem('token', data.token);
            navigation.navigate('EmpDashboard');
          } catch (e) {
            console.log('error', e);
          }
        } else {
          // Unexpected response
          Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
        }
      })
      .catch(error => {
        setIsLoading(false); // Stop loading animation
        // Network error or other exceptions
        Alert.alert('Error', 'An error occurred. Please try again later.');
      });
  };

  const handleSignUp = () => {
    // Navigate to sign-up screen
    console.log('Sign up pressed');

    navigation.navigate('EmpSignup');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ImageBackground
        source={require('./Background.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Image source={require('./CMOTS_Logo.jpg')} style={styles.logo} resizeMode="contain" />
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
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="white" size="small" /> // Show loading animation
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpLink}>Sign up</Text>
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

export default EmpLogin;
