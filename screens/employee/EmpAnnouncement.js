import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView, StatusBar, Platform, BackHandler } from 'react-native';

const EmpAnnouncement = ({ navigation, navigation: { goBack },route }) => {


    const {subject,message} = route.params;

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


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Announcement</Text>
      <View style={styles.noticeBox}>
        <Text style={styles.subject}>{subject}</Text>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Custom text color
  },
  noticeBox: {
    backgroundColor: '#F5F5F5', // Custom background color
    borderRadius: 10,
    padding: 20,
  },
  subject: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  messageContainer: {
    backgroundColor: '#fff', // Custom background color
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  message: {
    fontSize: 16,
    color: '#555', // Custom text color
  },
});

export default EmpAnnouncement;
