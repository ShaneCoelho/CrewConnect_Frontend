import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView, StatusBar, Platform, BackHandler } from 'react-native';

const StartScreen = ({ navigation }) => {
  useEffect(() => {
    // After 3 seconds, navigate to the next screen
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 3000); // 3000 milliseconds (3 seconds)

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/CMOTS_Logo.jpg')} // Replace with the actual path to your logo
        style={styles.logo}
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  logo: {
    width: 200, // Adjust the width and height to fit your logo
    height: 200,
  },
});

export default StartScreen;
