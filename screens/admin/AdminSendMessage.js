import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView, StatusBar, Platform, BackHandler } from 'react-native';


const AdminSendMessage=({navigation,navigation:{goBack},route}) =>{

    const {id,employeeId,name,designation,phone,email,address} = route.params;

    useEffect(() => {
        const backAction = () => {
          navigation.goBack();
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );

        console.log(id);
    
        return () => backHandler.remove();
        
      }, []);
    

  const [message, setMessage] = useState('');

  const handlePushMessage = async () => {
    console.log(id);
    console.log(employeeId);
    console.log(message);
    try {
      const response = await fetch('https://crewconnect.onrender.com/sendnotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          employeeId: employeeId,
          message: message,
        }),
      });

      if (response.ok) {
        // API request successful
        Alert.alert('Message sent successfully');
        // Optionally, you can handle the response data here if needed
        // const responseData = await response.json();
        // console.log('API Response:', responseData);
      } else {
        // API request failed
        Alert.alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('An error occurred while sending the message.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.container}>
      <Text style={styles.title}>Message To Employee</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Enter your message"
        multiline={true} // Set this to true for a TextArea
        onChangeText={(text) => setMessage(text)}
        value={message}
      />
      <TouchableOpacity style={styles.button} onPress={handlePushMessage}>
        <Text style={styles.buttonText}>Push Message</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textArea: {
    width: '100%',
    height: 120, // Adjust the height as needed
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminSendMessage;