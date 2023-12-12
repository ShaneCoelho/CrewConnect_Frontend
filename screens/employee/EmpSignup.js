import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'; // Import ActivityIndicator
import { SafeAreaView, StatusBar, Platform, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmpSignup = ({navigation,navigation:{goBack}}) => {

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

  const [loading, setLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [designation, setDesignation] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleSignup = async () => {
    if (
      employeeId.trim() === '' ||
      name.trim() === '' ||
      phone.trim() === '' ||
      email.trim() === '' ||
      address.trim() === '' ||
      designation.trim() === '' ||
      username.trim() === '' ||
      password.trim() === ''
    ) {
      Alert.alert('Error', 'Please fill all the fields');
    } else if (!/^\d{6}$/.test(employeeId)) {
      Alert.alert('Error', 'Employee ID should be numeric and have exactly six digits');
    } else if (!/^\d{10}$/.test(phone)) {
      Alert.alert('Error', 'Phone should be numeric and have exactly ten digits');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
    } else if (password.length < 6 || password.length > 10) {
      Alert.alert('Error', 'Password should be between 6 and 10 characters');
    } else {

      setLoading(true);
      fetch("https://crewconnect.onrender.com/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "employeeId": employeeId,
          "name": name,
          "phone": phone,
          "email": email,
          "address": address,
          "designation": designation,
          "username": username,
          "password": password
        })
      })
        .then(res => res.json())
        .then(async data => {
          console.log(data);
          setLoading(false); // Set loading to false when the response is received
          
          if (data.message && data.message === "Username Already Taken") {
            // Display an alert if the username already exists
            Alert.alert('Error', 'Username Already Exists');
          } else {
            // If the username does not exist, proceed with signup
            try {
              await AsyncStorage.setItem('token', data.token);
              // Reset the form after successful signup
              setEmployeeId('');
              setName('');
              setPhone('');
              setEmail('');
              setAddress('');
              setDesignation('');
              setUsername('');
              setPassword('');
              setProfileImage(null);
              navigation.navigate('EmpDashboard');
            } catch (e) {
              console.log('error', e)
            }
          }
        })
        .catch(error => {
          // Handle API request errors here
          console.error("API Request Error:", error);
          setLoading(false); // Set loading to false on error
          Alert.alert('Error', 'Something went wrong. Please try again later.');
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          <Text style={styles.label}>Enter Employee ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Employee ID"
            placeholderTextColor="#999"
            value={employeeId}
            onChangeText={setEmployeeId}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Enter Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.label}>Enter Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor="#999"
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Enter Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Text style={styles.label}>Enter Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Address"
            placeholderTextColor="#999"
            value={address}
            onChangeText={setAddress}
          />
          <Text style={styles.label}>Enter Designation</Text>
          <TextInput
            style={styles.input}
            placeholder="Designation"
            placeholderTextColor="#999"
            value={designation}
            onChangeText={setDesignation}
          />
          <Text style={styles.label}>Enter Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
          />
          <Text style={styles.label}>Enter Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {/* Implement profile image upload logic here */}
          {/* Use a library like 'react-native-image-picker' or 'react-native-document-picker' */}
          <TouchableOpacity style={styles.signupButton} onPress={handleSignup} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="white" size="small" /> // Show loading animation
            ) : (
              <Text style={styles.signupButtonText}>Signup</Text>
            )}
          </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  signupButton: {
    width: '100%',
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EmpSignup;
