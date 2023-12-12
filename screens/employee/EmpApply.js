import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, BackHandler } from 'react-native';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import { responsiveScreenFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const dummyLeaves = [
  { id: '1', fromDate: '2023-06-20', toDate: '2023-06-22', status: 'Approve' },
  { id: '2', fromDate: '2023-06-28', toDate: '2023-06-30', status: 'Rejected' },
  { id: '3', fromDate: '2023-07-01', toDate: '2023-07-02', status: 'Approved' },
];

const dummyWFHRequests = [
  // { id: '1', fromdate: '2023-06-25', todate: '2023-06-26', status: 'Approve' },
  // { id: '2', fromdate: '2023-07-05', todate: '2023-07-06', status: 'Reject' },
];


const EmpApply = ({ navigation, navigation: { goBack } }) => {
  const [leaves, setLeaves] = useState([]);
  const [wfhRequests, setWFHRequests] = useState([]);

  useEffect(() => {
    // Simulating fetching leaves and work from home requests data from an API or database
    // Replace this with your actual API call or data retrieval logic

    // setTimeout(() => {
    //   // setLeaves(dummyLeaves);
    //   setWFHRequests(dummyWFHRequests);
    // }, 1000);

    fetchPastLeave();
    fetchPastWfh();

    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [leaves]);

  const fetchPastLeave = async () => {
    // Fetch leave requests from API and update state
    // Replace this with your actual API call

    try {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');

      // Make a POST request to the API with the token
      const response = await fetch('https://crewconnect.onrender.com/pastleave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      // Process the response data
      const responseData = await response.json();
      setLeaves(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  const fetchPastWfh = async () => {
    // Fetch leave requests from API and update state
    // Replace this with your actual API call

    try {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');

      // Make a POST request to the API with the token
      const response = await fetch('https://crewconnect.onrender.com/pastwfh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      // Process the response data
      const responseData = await response.json();
      setWFHRequests(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={[styles.listItemText, item.status === 'Approve' && styles.approvedStatus, item.status === 'Reject' && styles.rejectedStatus]}>From: {item.fromdate}</Text>
      <Text style={[styles.listItemText, item.status === 'Approve' && styles.approvedStatus, item.status === 'Reject' && styles.rejectedStatus]}>To: {item.todate}</Text>
      <Text style={[styles.listItemText, item.status === 'Approve' && styles.approvedStatus, item.status === 'Reject' && styles.rejectedStatus]}>Status: {item.status}</Text>
    </View>
  );

  const applyForLeave = () => {
    // Logic for applying for leave goes here
    // You can navigate to a new screen/component or display a modal for the form
    navigation.navigate('EmpLeave');
  };

  const applyForWFH = () => {
    // Logic for applying for work from home goes here
    // You can navigate to a new screen/component or display a modal for the form
    navigation.navigate('EmpWfh');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Apply for Leave</Text>
        <TouchableOpacity style={styles.applyButton} onPress={applyForLeave}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>Apply for Work From Home</Text>
        <TouchableOpacity style={styles.applyButton} onPress={applyForWFH}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.heading}>Past Leaves</Text>
          {leaves.length > 0 ? (
            <FlatList
              data={leaves}
              renderItem={renderItem}
              keyExtractor={(item) => item.code}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <Text style={styles.emptyText}>No past leaves</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Past Work From Home Requests</Text>
          {wfhRequests.length > 0 ? (
            <FlatList
              data={wfhRequests}
              renderItem={renderItem}
              keyExtractor={(item) => item.code}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <Text style={styles.emptyText}>No past work from home requests</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const styles = {
  container: {
    flex: 1,
    padding: responsiveWidth(4),
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  section: {
    flex: 1,
    marginBottom: responsiveWidth(4),
  },
  heading: {
    fontSize: responsiveScreenFontSize(3),
    fontWeight: 'bold',
    marginBottom: responsiveWidth(2),
  },
  listContainer: {
    paddingBottom: responsiveWidth(2),
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: responsiveWidth(2),
    padding: responsiveWidth(4),
    marginBottom: responsiveWidth(4),
  },
  listItemText: {
    fontSize: responsiveScreenFontSize(2),
    marginBottom: responsiveWidth(2),
  },
  approvedStatus: {
    color: 'green',
  },
  rejectedStatus: {
    color: 'red',
  },
  applyButton: {
    backgroundColor: '#388cd6',
    borderRadius: responsiveWidth(2),
    paddingVertical: responsiveWidth(3),
    paddingHorizontal: responsiveWidth(4),
    marginBottom: responsiveWidth(4),
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: responsiveScreenFontSize(2),
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: responsiveScreenFontSize(2),
    marginTop: responsiveWidth(4),
  },
};

export default EmpApply;
