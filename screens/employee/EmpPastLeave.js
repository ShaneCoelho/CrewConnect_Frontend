import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView, StatusBar, Platform, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const itemWidth = width * 0.9;

const EmpPastLeave = ({navigation,navigation:{goBack}}) => {
  const [pastLeaves, setPastLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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


  useEffect(() => {

    fetchPastLeaveDetails();
  }, [pastLeaves]);



  const fetchPastLeaveDetails = async () => {

    try {
    //   const response = await fetch("https://crewconnect.onrender.com/pastleavedetails",{
    //     method:"POST",
    //     headers:{
    //       'Content-Type':'application/json'
    //     },
    //   body:JSON.stringify({
    //     "id":id
    //   })
    //   })

    const token = await AsyncStorage.getItem('token');

      const response = await fetch('https://crewconnect.onrender.com/emppastleave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

    const responseData = await response.text();
    //console.log(responseData); // Log the response data

    const data = JSON.parse(responseData);
    setPastLeaves(data);
    setIsLoading(false);

    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }

  };



  const renderLeaveItem = ({ item }) => (
    <View style={styles.leaveItem}>
      {/* <Text style={styles.leaveText}>Employee: {item.name}</Text> */}
      <Text style={styles.leaveText}>From: {item.fromdate}</Text>
      <Text style={styles.leaveText}>To: {item.todate}</Text>
      <Text style={styles.leaveText}>Reason: {item.reason}</Text>
      <Text style={styles.leaveText}>Approved on: {item.approvedate}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.container}>
      <Text style={styles.heading}>Past Leave Details</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#333333" style={styles.loadingIndicator} />
      ) : (
        <>
          {pastLeaves.length > 0 ? (
            <FlatList
              data={pastLeaves}
              renderItem={renderLeaveItem}
              keyExtractor={(item) => item.code.toString()}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <Text style={styles.emptyText}>No past leaves found.</Text>
          )}
        </>
      )}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  leaveItem: {
    width: itemWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  leaveText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333333',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#666666',
  },
  loadingIndicator: {
    marginTop: 40,
  },

});

export default EmpPastLeave;
