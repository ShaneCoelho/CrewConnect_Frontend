import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView, StatusBar, Platform, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmpPersonalInfo = ({ navigation, navigation: { goBack } }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [designation, setDesignation] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [personalinfo, setPersonalInfo] = useState({});
  const [loading, setLoading] = useState(false); // State for managing loading animation
  const [error, setError] = useState(false); // State for handling errors
  const [saveloading, setSaveLoading] = useState(false);


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

  // Fetch profile information from API
  useEffect(() => {
    fetchProfileInfo();
  }, []);

  useEffect(() => {
    setEmployeeId(personalinfo.employeeId);
    setName(personalinfo.name);
    setPhone(personalinfo.phone);
    setEmail(personalinfo.email);
    setAddress(personalinfo.address);
    setDesignation(personalinfo.designation);
    setUsername(personalinfo.username);
    setPassword(personalinfo.password);
  }, [personalinfo]);

  const fetchProfileInfo = async () => {
    // Dummy data for testing purposes
    // const dummyData = {
    //   employeeId: '12345',
    //   name: 'John Doe',
    //   phone: '1234567890',
    //   email: 'johndoe@example.com',
    //   address: '123 Main Street',
    //   designation: 'Software Engineer',
    //   username: 'johndoe',
    //   // password: 'password'
    // };

    setLoading(true);


    try {
      const token = await AsyncStorage.getItem('token');

      // Make a POST request to the API with the token
      const response = await fetch('https://crewconnect.onrender.com/personalinformation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      const responseData = await response.text();

      // Handle potential errors in parsing the API response data
      let data = {};
      try {
        data = JSON.parse(responseData);
      } catch (error) {
        setError(true);
      }

      setPersonalInfo(data);
      console.log(personalinfo)
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(true); // Set error to true if there's an error during data fetching
      setLoading(false); // Set loading to false in case of error
    }

    // setEmployeeId(personalinfo.employeeId);
    // setName(personalinfo.name);
    // setPhone(personalinfo.phone);
    // setEmail(personalinfo.email);
    // setAddress(personalinfo.address);
    // setDesignation(personalinfo.designation);
    // setUsername(personalinfo.username);
    // setPassword(personalinfo.password);
  };

  const saveProfile = async () => {

    if (
      employeeId.trim() === '' ||
      name.trim() === '' ||
      phone.trim() === '' ||
      email.trim() === '' ||
      address.trim() === '' ||
      designation.trim() === '' ||
      username.trim() === ''
    ) {
      Alert.alert('Error', 'Please fill all the fields');
    } else if (!/^\d{6}$/.test(employeeId)) {
      Alert.alert('Error', 'Employee ID should be numeric and have exactly six digits');
    } else if (!/^\d{10}$/.test(phone)) {
      Alert.alert('Error', 'Phone should be numeric and have exactly ten digits');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
    } else {
      setSaveLoading(true);
      const token = await AsyncStorage.getItem('token');
      // Make API request here to save profile information
      // Replace 'apiEndpoint' with your actual API endpoint
      try {
        const response = await fetch("https://crewconnect.onrender.com/updateempinfo", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            employeeId,
            name,
            phone,
            email,
            address,
            designation,
            username,
          }),
        });

        const data = await response.json();
        setSaveLoading(false);
        if (response.ok) {
          // User updated successfully
          Alert.alert('Success', data.message);
        } else {
          // Error occurred while updating user
          Alert.alert('Error', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        setSaveLoading(false);
        Alert.alert('Error', 'An error occurred while updating the user.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? ( // Show loading animation when loading is true
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : error ? ( // Show error message when error is true
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to fetch data.</Text>
          <TouchableOpacity onPress={fetchProfileInfo}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.heading}>Personal Information</Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Employee ID:</Text>
              <TextInput
                style={styles.input}
                value={employeeId}
                onChangeText={setEmployeeId}
                editable={true}
              />
            </View>

            {/* ...other fields... */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Name:</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                editable={true}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Phone:</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                editable={true}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                editable={true}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Address:</Text>
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                editable={true}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Designation:</Text>
              <TextInput
                style={styles.input}
                value={designation}
                onChangeText={setDesignation}
                editable={true}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Username:</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                editable={true}
              />
            </View>

            {/* <View style={styles.fieldContainer}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          editable={true}
          secureTextEntry={true}
        />
      </View> */}


            <TouchableOpacity style={styles.button} onPress={saveProfile} disabled={saveloading}>
              {saveloading ? (
                <ActivityIndicator color="white" size="small" /> // Show loading animation
              ) : (
                <Text style={styles.buttonText}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    flexGrow: 1, // Important: This allows the content to extend beyond the screen height
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },
  fieldContainer: {
    marginBottom: 16
  },
  label: {
    fontSize: 16,
    marginBottom: 8
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8
  },
  button: {
    backgroundColor: '#388cd6',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 16
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default EmpPersonalInfo;
