import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet, ScrollView } from 'react-native';
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

      fetch("https://e5ff-115-69-246-225.ngrok-free.app/signup",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
      body:JSON.stringify({
        "employeeId":employeeId,
        "name":name,
        "phone":phone,
        "email":email,
        "address":address,
        "designation":designation,
        "username":username,
        "password":password
      })
      })
      .then(res=>res.json())
      .then(async data=>{
        console.log(data)
        try {
          await AsyncStorage.setItem('token', data.token);
        } catch (e) {
          console.log('error',e)
        }
      })
      // Perform signup logic here
      // e.g., make API call to register the employee

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

      

      // Alert.alert('Success', 'Signup successful!');
      navigation.navigate('EmpDashboard');
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
          <Button title="Signup" onPress={handleSignup} />
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
});

export default EmpSignup;
