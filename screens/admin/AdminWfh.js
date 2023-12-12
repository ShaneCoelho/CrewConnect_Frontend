import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView, StatusBar, Platform, BackHandler } from 'react-native';

const AdminWfh = ({navigation,navigation:{goBack},route}) => {

  const {id,name,fromdate,todate,reason} = route.params;
  const [approvedate, setApproveDate] = useState(new Date());

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




  const [wfhFromDate, setWfhFromDate] = useState('');
  const [wfhToDate, setWfhToDate] = useState('');
  const [wfhReason, setWfhReason] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);




  const handleApproveWfh = () => {

    setApproveDate(new Date());

    fetch("https://crewconnect.onrender.com/approvewfh",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
      body:JSON.stringify({
        "Lid":"64f43f0eeedc485379bbf3de",
        "id":id,
        "fromdate":fromdate,
        "todate":todate,
        "approvedate":approvedate.toISOString().split('T')[0]
      })
      })

    setIsButtonDisabled(true); // Disable the buttons
    Alert.alert('Wfh Approved!', `Wfh From: ${fromdate}\nWfh To: ${todate}\nReason: ${reason}`);
  };

  const handleRejectWfh = () => {

    fetch("https://crewconnect.onrender.com/rejectwfh",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
      body:JSON.stringify({
        "Lid":"64f43f0eeedc485379bbf3de",
        "id":id,
        "fromdate":fromdate
      })
      })

    setIsButtonDisabled(true); // Disable the buttons
    Alert.alert('Wfh Rejected!', `Wfh From: ${fromdate}\nWfh To: ${todate}\nReason: ${reason}`);
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.container}>
      <Text style={styles.title}>Employee WFH Details</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Employee Name:</Text>
        <Text style={styles.text}>{name}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>From Date:</Text>
        <Text style={styles.text}>{wfhFromDate ? wfhFromDate : fromdate}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>To Date:</Text>
        <Text style={styles.text}>{wfhToDate ? wfhToDate : todate}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Reason:</Text>
        <ScrollView style={styles.reasonScrollView}>
          <Text style={styles.reasonText}>{wfhReason ? wfhReason : reason}</Text>
        </ScrollView>
      </View>

      <View style={[styles.buttonContainer, { width: screenWidth * 0.9 }]}>
        <Button
          title="Approve WFH"
          onPress={handleApproveWfh}
          disabled={isButtonDisabled} // Disable the button when isButtonDisabled is true
          color="green"
        />
        <Button
          title="Reject WFH"
          onPress={handleRejectWfh}
          disabled={isButtonDisabled} // Disable the button when isButtonDisabled is true
          color="red"
        />
      </View>

    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
  },
  reasonScrollView: {
    height: 100,
  },
  reasonText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryContainer: {
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    paddingTop: 16,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    flex: 1,
  },
  pastLeaveButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
    alignItems: 'center',
  },
  pastLeaveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminWfh;
