import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView, StatusBar, Platform, BackHandler, Alert } from 'react-native';

const Home = ({ navigation }) => {

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleAdminLogin = () => {
    navigation.navigate('AdminLogin');
  };

  const handleEmployeeLogin = () => {
    navigation.navigate('EmpLogin');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.container}>
      <Image source={require('./favicon.png')} style={styles.logo} />
      <Text style={styles.heading}>Welcome to Employee App</Text>
      <TouchableOpacity style={styles.button} onPress={handleAdminLogin}>
        <Text style={styles.buttonText}>Admin Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleEmployeeLogin}>
        <Text style={styles.buttonText}>Employee Login</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: 200,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
