import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView, StatusBar, Platform, BackHandler } from 'react-native';

const AdminLeave = ({navigation,navigation:{goBack},route}) => {

  const [takenLeave, setTakenLeave] = useState(0);
  const [remainingLeave, setRemainingLeave] = useState(0);
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

  useEffect(()=>{

    fetchLeaveSummary();

  },[takenLeave,remainingLeave])



  const [leaveFromDate, setLeaveFromDate] = useState('');
  const [leaveToDate, setLeaveToDate] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handlePastLeaveDetails = () => {
    navigation.navigate('AdminPastLeave', {id});
  };


  const fetchLeaveSummary = async () => {
    try {
      const response = await fetch('https://213a-45-114-251-176.ngrok-free.app/empleavesummary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });

      const data = await response.json();
      const { takenLeave, remainingLeave } = data;
      setTakenLeave(takenLeave);
      setRemainingLeave(remainingLeave);
    } catch (error) {
      console.error(error);
    }
  };



  const handleApproveLeave = () => {

    setApproveDate(new Date());

    fetch("https://213a-45-114-251-176.ngrok-free.app/approveleave",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
      body:JSON.stringify({
        "Lid":"64a157f9be7b86a0705c70de",
        "id":id,
        "fromdate":fromdate,
        "todate":todate,
        "approvedate":approvedate.toISOString().split('T')[0]
      })
      })

    setIsButtonDisabled(true); // Disable the buttons
    Alert.alert('Leave Approved!', `Leave From: ${fromdate}\nLeave To: ${todate}\nReason: ${reason}`);
  };

  const handleRejectLeave = () => {

    fetch("https://213a-45-114-251-176.ngrok-free.app/rejectleave",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
      body:JSON.stringify({
        "Lid":"64a157f9be7b86a0705c70de",
        "id":id,
        "fromdate":fromdate
      })
      })

    setIsButtonDisabled(true); // Disable the buttons
    Alert.alert('Leave Rejected!', `Leave From: ${fromdate}\nLeave To: ${todate}\nReason: ${reason}`);
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.container}>
      <Text style={styles.title}>Employee Leave Details</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Employee Name:</Text>
        <Text style={styles.text}>{name}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>From Date:</Text>
        <Text style={styles.text}>{leaveFromDate ? leaveFromDate : fromdate}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>To Date:</Text>
        <Text style={styles.text}>{leaveToDate ? leaveToDate : todate}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Reason:</Text>
        <ScrollView style={styles.reasonScrollView}>
          <Text style={styles.reasonText}>{leaveReason ? leaveReason : reason}</Text>
        </ScrollView>
      </View>

      <View style={[styles.buttonContainer, { width: screenWidth * 0.9 }]}>
        <Button
          title="Approve Leave"
          onPress={handleApproveLeave}
          disabled={isButtonDisabled} // Disable the button when isButtonDisabled is true
          color="green"
        />
        <Button
          title="Reject Leave"
          onPress={handleRejectLeave}
          disabled={isButtonDisabled} // Disable the button when isButtonDisabled is true
          color="red"
        />
      </View>

      {/* Past Leave Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Past Leave Summary</Text>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryText}>Leaves Taken:</Text>
          <Text style={styles.summaryValue}>{takenLeave}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryText}>Leaves Remaining:</Text>
          <Text style={styles.summaryValue}>{remainingLeave}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryText}>Extra Days Worked:</Text>
          <Text style={styles.summaryValue}>5</Text>
        </View>

        <TouchableOpacity style={styles.pastLeaveButton} onPress={handlePastLeaveDetails}>
    <Text style={styles.pastLeaveButtonText}>View Past Leave Details</Text>
  </TouchableOpacity>
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

export default AdminLeave;
