import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, BackHandler, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmpDashboard = ({ navigation }) => {
  // Sample data for leave summary, calendar, announcements, and board messages

  const [leaveSummary,setLeaveSummary]=useState({})
 
  useEffect(() => {

    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    
    return () => backHandler.remove();

  
  }, []);


  useEffect(()=>{

    loadLeaveSummary();
    
  },[leaveSummary])




  const loadLeaveSummary = async () => {

    try {
      const token = await AsyncStorage.getItem('token');

      // Make a POST request to the API with the token
      const response = await fetch('https://e5ff-115-69-246-225.ngrok-free.app/loaddashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

    const responseData = await response.text();

    const data = JSON.parse(responseData);
    setLeaveSummary(data);
    } catch (error) {
      console.error(error);
    }

  };

 

  // const leaveSummary = {
  //   totalLeaves: 20,
  //   leavesTaken: 10,
  //   leavesRemaining: 10,
  // };

  const calendarEvents = [
    {
      date: '2023-06-17',
      event: 'Holiday',
    },
    {
      date: '2023-06-20',
      event: 'Meeting',
    },
    // Add more events as needed
  ];

  const announcements = [
    {
      id: 1,
      title: 'Welcome to the Employee App',
      message: 'Ldfegrth ghreh fwttweee wfewqe htyjtyj fwfewef.',
    },
    {
      id: 2,
      title: 'Important Notice',
      message: 'Ufhrhr sdsergrth sfawge fbgjtj kil dadw rehg.',
    },
    // Add more announcements as needed
  ];

  const boardMessages = [
    {
      id: 1,
      sender: 'Shane Coelho',
      message: 'Lhhjvy djfbdsjkvb lbkbn sdgcsd kbmb opwen dv gsghc dvdkvn.',
    },
    {
      id: 2,
      sender: 'Ajay Nagar',
      message: 'Usgrth sfegrh sfwet jkuil adwafeaf hjyuk awefw mnyoip.',
    },
    // Add more board messages as needed
  ];

  const handleProfilePress = () => {
    // Handle profile photo press
    navigation.navigate('EmpProfile');
  };

  const handleLeavesPress = () => {
    // Handle leaves button press
    navigation.navigate('EmpApply')
    console.log('Leaves button pressed');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image
            source={require('./favicon.png')}
            style={styles.profilePhoto}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Employee App</Text>
        <TouchableOpacity onPress={handleLeavesPress}>
          <Feather name="file-text" size={24} color="#0c0d0c" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Leave Summary</Text>
        <View style={styles.leaveSummaryContainer}>
          <View style={styles.leaveSummaryItem}>
            <Text style={styles.leaveSummaryValue}>{leaveSummary.totalLeave}</Text>
            <Text style={styles.leaveSummaryLabel}>Total Leaves</Text>
          </View>
          <View style={styles.leaveSummaryItem}>
            <Text style={styles.leaveSummaryValue}>{leaveSummary.takenLeave}</Text>
            <Text style={styles.leaveSummaryLabel}>Leaves Taken</Text>
          </View>
          <View style={styles.leaveSummaryItem}>
            <Text style={styles.leaveSummaryValue}>{leaveSummary.remainingLeave}</Text>
            <Text style={styles.leaveSummaryLabel}>Leaves Remaining</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Calendar</Text>
        {calendarEvents.map((event, index) => (
          <View key={index} style={styles.calendarEvent}>
            <View style={styles.calendarEventIcon}>
              <Feather name="calendar" size={20} color="#555555" />
            </View>
            <View style={styles.calendarEventDetails}>
              <Text style={styles.calendarEventDate}>{event.date}</Text>
              <Text style={styles.calendarEventName}>{event.event}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Announcements</Text>
        <ScrollView style={styles.announcementContainer}>
          {announcements.map((announcement) => (
            <TouchableOpacity key={announcement.id} style={styles.announcement}>
              <Text style={styles.announcementTitle}>{announcement.title}</Text>
              <Text style={styles.announcementMessage}>{announcement.message}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Board Messages</Text>
        <ScrollView style={styles.boardMessageContainer}>
          {boardMessages.map((message) => (
            <View key={message.id} style={styles.boardMessage}>
              <View style={styles.boardMessageHeader}>
                <Feather name="user" size={16} color="#555555" />
                <Text style={styles.boardMessageSender}>{message.sender}</Text>
              </View>
              <View style={styles.boardMessageContent}>
                <Text style={styles.boardMessageText}>{message.message}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  // Rest of the styles...
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  leaveSummaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leaveSummaryItem: {
    alignItems: 'center',
  },
  leaveSummaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  leaveSummaryLabel: {
    fontSize: 14,
    color: '#555555',
  },
  calendarEvent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  calendarEventIcon: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarEventDetails: {
    marginLeft: 12,
  },
  calendarEventDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  calendarEventName: {
    fontSize: 12,
    color: '#555555',
  },
  announcementContainer: {
    maxHeight: 175, // Set a maximum height for the scrollbar to appear
  },
  announcement: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F4F4F4',
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  announcementMessage: {
    fontSize: 14,
    color: '#555555',
  },
  boardMessageContainer: {
    maxHeight: 175, // Set a maximum height for the scrollbar to appear
  },
  boardMessage: {
    backgroundColor: '#F4F4F4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  boardMessageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  boardMessageSender: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  boardMessageContent: {
    marginLeft: 24,
  },
  boardMessageText: {
    fontSize: 14,
    color: '#555555',
  },
});

export default EmpDashboard;