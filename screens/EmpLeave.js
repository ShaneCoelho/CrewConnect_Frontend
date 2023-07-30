import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView, StatusBar, Platform, BackHandler } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmpLeave = ({navigation,navigation:{goBack}}) => {

  const [token, setToken] = useState('');
  const [summary, setSummary] = useState({}); 

  useEffect(() => {

    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
    

    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [summary]);

  useEffect(()=>{

    fetchSummary();

  },[summary])

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
// Example value, replace with actual data
  // const [remainingLeaves, setRemainingLeaves] = useState(15); // Example value, replace with actual data
  const [extraDaysWorked, setExtraDaysWorked] = useState(3); // Example value, replace with actual data
  const [isFromDateSelected, setIsFromDateSelected] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);


  const fetchSummary = async () => {
    // Fetch leave requests from API and update state
    // Replace this with your actual API call

    try {

      // Make a POST request to the API with the token
      const response = await fetch('https://213a-45-114-251-176.ngrok-free.app/leavesummary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      // Process the response data
      const responseData = await response.json();
      setSummary(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleDateSelection = (date) => {
    if (isFromDateSelected) {
      setFromDate(date);
    } else {
      setToDate(date);
    }
    setIsCalendarOpen(false); // Close the calendar after date selection
  };

  const handleFromDatePress = () => {
    setIsFromDateSelected(true);
    setIsCalendarOpen(true);
  };

  const handleToDatePress = () => {
    setIsFromDateSelected(false);
    setIsCalendarOpen(true);
  };

  const handleSubmit = () => {

    fetch("https://213a-45-114-251-176.ngrok-free.app/leaverequest",{
      method:"POST",
      headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type':'application/json'
      },
    body:JSON.stringify({
      "fromdate":fromDate,
      "todate":toDate,
      "reason":reason
    })
    })
    .then(res=>res.json())

    Alert.alert('Success', 'Request for leave submitted');

    // Handle form submission here
    // You can send the leave request to the server or perform any other action
    console.log('Leave request submitted');
    console.log('From:', fromDate);
    console.log('To:', toDate);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.container}>
      <Text style={styles.heading}>Request Leave</Text>

      <View style={styles.datePickerContainer}>
        <Text style={styles.label}>From:</Text>
        <TouchableOpacity onPress={handleFromDatePress} style={styles.inputContainer}>
          <TextInput
            style={styles.datePicker}
            editable={false}
            value={fromDate}
          />
          <Text style={styles.calendarIcon}>📅</Text>
        </TouchableOpacity>

        <Text style={styles.label}>To:</Text>
        <TouchableOpacity onPress={handleToDatePress} style={styles.inputContainer}>
          <TextInput
            style={styles.datePicker}
            editable={false}
            value={toDate}
          />
          <Text style={styles.calendarIcon}>📅</Text>
        </TouchableOpacity>

        <Modal visible={isCalendarOpen} animationType="slide">
          <Calendar
            markedDates={{
              [fromDate]: { startingDay: true, color: '#00B0FF' },
              [toDate]: { endingDay: true, color: '#00B0FF' },
            }}
            onDayPress={(day) => handleDateSelection(day.dateString)}
          />
          <Button title="Close" onPress={() => setIsCalendarOpen(false)} />
        </Modal>
      </View>

      <View style={styles.reasonContainer}>
        <Text style={styles.label}>Reason:</Text>
        <TextInput
          style={styles.reasonInput}
          multiline={true}
          value={reason}
          onChangeText={(text) => setReason(text)}
        />
      </View>

      <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Past Leaves Taken: <Text style={styles.summaryValue}>{summary.takenLeave}</Text>
        </Text>
        <Text style={styles.summaryText}>
          Leaves Remaining: <Text style={styles.summaryValue}>{summary.remainingLeave}</Text>
        </Text>
        <Text style={styles.summaryText}>
          Extra Days Worked: <Text style={styles.summaryValue}>{extraDaysWorked}</Text>
        </Text>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'), // Responsive padding based on screen width
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  heading: {
    fontSize: wp('6%'), // Responsive font size based on screen width
    fontWeight: 'bold',
    marginBottom: hp('2%'), // Responsive margin based on screen height
  },
  datePickerContainer: {
    marginBottom: hp('3%'), // Responsive margin based on screen height
  },
  label: {
    fontSize: wp('4%'), // Responsive font size based on screen width
    marginBottom: hp('1%'), // Responsive margin based on screen height
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePicker: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: wp('2%'), // Responsive padding based on screen width
    marginBottom: hp('2%'), // Responsive margin based on screen height
  },
  calendarIcon: {
    marginLeft: wp('2%'), // Responsive margin based on screen width
  },
  reasonContainer: {
    marginBottom: hp('3%'), // Responsive margin based on screen height
  },
  reasonInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: wp('2%'), // Responsive padding based on screen width
    height: hp('15%'), // Responsive height based on screen height
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#388cd6',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('2%'), // Responsive margin based on screen height
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp('4%'), // Responsive font size based on screen width
  },
  summaryContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: wp('2%'), // Responsive padding based on screen width
    marginTop: hp('2%'), // Responsive margin based on screen height
  },
  summaryText: {
    fontSize: wp('4%'), // Responsive font size based on screen width
    marginBottom: hp('1%'), // Responsive margin based on screen height
  },
  summaryValue: {
    fontWeight: 'bold',
  },
});

export default EmpLeave;
