
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, BackHandler, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView, StatusBar, Platform, DrawerLayoutAndroid, ImagePicker } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const EmpDrawerContent = ({ navigation }) => {
    const [profilePhoto, setProfilePhoto] = useState(null);
  
    const handleProfilePhotoPress = () => {
      // Handle profile photo edit press
      // Use a suitable method to choose or capture a photo from the device and update the profile photo
      // For simplicity, let's assume the user can only choose a photo from the device's gallery
      ImagePicker.launchImageLibrary({}, (response) => {
        if (!response.didCancel && !response.error) {
          setProfilePhoto(response.uri);
        }
      });
    };
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.drawerContainer}>
      <View style={styles.headerDrawer}>
          <TouchableOpacity style={styles.profileContainer} onPress={handleProfilePhotoPress}>
            <Image source={{ uri: profilePhoto }} style={styles.profilePhotoDrawer} />
            <Feather name="edit" size={16} color="#FFFFFF" style={styles.editIcon} />
          </TouchableOpacity>
          <Text style={styles.drawerName}>Employee Name</Text>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.drawerOption} onPress={() => navigation.navigate('PersonalInfo')}>
            <Feather name="user" size={20} color="#000000" />
            <Text style={styles.drawerOptionText}>Personal Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerOption} onPress={() => navigation.navigate('MyDocuments')}>
            <Feather name="file-text" size={20} color="#000000" />
            <Text style={styles.drawerOptionText}>My Documents</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerOption} onPress={() => navigation.navigate('PastLeave')}>
            <Feather name="calendar" size={20} color="#000000" />
            <Text style={styles.drawerOptionText}>Past Leave</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerOption} onPress={() => navigation.navigate('Salary')}>
            <Feather name="dollar-sign" size={20} color="#000000" />
            <Text style={styles.drawerOptionText}>Salary</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerOption} onPress={() => navigation.navigate('EmpDetails')}>
            <Feather name="log-out" size={20} color="#000000" />
            <Text style={styles.drawerOptionText}>Logout</Text>
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
    
    headerDrawer: {
      paddingHorizontal: 20,
      paddingTop: 30,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#CCCCCC',
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    profilePhotoDrawer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 10,
    },
    editIcon: {
      backgroundColor: '#000000',
      borderRadius: 8,
      padding: 4,
    },
    drawerName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000000',
    },
    menuContainer: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    drawerOption: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    drawerOptionText: {
      marginLeft: 10,
      fontSize: 16,
      color: '#000000',
    },
    drawerContainer: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
  });


  export default EmpDrawerContent;