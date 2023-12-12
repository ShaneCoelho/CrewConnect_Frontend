import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView, StatusBar, Platform, BackHandler } from 'react-native';

const AdminSendNotice=({navigation,navigation:{goBack}})=> {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

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

  const sendNotice = async () => {
    try {
      const response = await fetch('https://crewconnect.onrender.com/sendnotice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: subject,
          message: message,
        }),
      });

      if (response.ok) {
        // API request successful
        Alert.alert('Notice sent successfully');
        // Optionally, you can handle the response data here if needed
        // const responseData = await response.json();
        // console.log('API Response:', responseData);
      } else {
        // API request failed
        Alert.alert('Failed to send Notice. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending notice:', error);
      Alert.alert('An error occurred while sending the notice.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.container}>
      <Text style={styles.header}>Send Notice</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Subject"
          value={subject}
          onChangeText={(text) => setSubject(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Enter Message"
          value={message}
          onChangeText={(text) => setMessage(text)}
          multiline
          numberOfLines={4}
          style={[styles.input, styles.messageInput]}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={sendNotice}>
        <Text style={styles.buttonText}>Send Notice</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    padding: 16,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%', // Button takes the full width
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminSendNotice;
