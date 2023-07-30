import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AdminDashboard = ({navigation}) => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [wfhRequests, setWfhRequests] = useState([]);
  const [upcomingMeeting, setUpcomingMeeting] = useState(null);
  // Other state variables...


  // Use useEffect and fetch functions...

  useEffect(() => {
    // Fetch leave requests from API
    fetchLeaveRequests();

    // Fetch WFH requests from API
    fetchWfhRequests();

    // Fetch upcoming meeting from API
    fetchUpcomingMeeting();
  }, [leaveRequests]);

  const fetchLeaveRequests = async () => {
    // Fetch leave requests from API and update state
    // Replace this with your actual API call

    try {
      // const response = await fetch("https://b5d0-115-69-246-207.ngrok-free.app/displayleave");
      // const data = await response.json();
      // //const leaveRequestsData = Object.values(data);
      // setLeaveRequests(data);
      // //console.log(data);

      const response = await fetch('https://213a-45-114-251-176.ngrok-free.app/displayleave', {
      method: 'POST',
    });
    const responseData = await response.text();
    //console.log(responseData); // Log the response data

    const data = JSON.parse(responseData);
    setLeaveRequests(data);
    } catch (error) {
      console.error(error);
    }


    // const leaveRequestsData = [
    //   { id: 1, employeeName: 'John Doe', startDate: '2023-06-01', endDate: '2023-06-05' },
    //   { id: 2, employeeName: 'Jane Smith', startDate: '2023-06-10', endDate: '2023-06-12' },
    //   { id: 3, employeeName: 'Jane Smith', startDate: '2023-06-10', endDate: '2023-06-12' },
    //   { id: 4, employeeName: 'Jane Smith', startDate: '2023-06-10', endDate: '2023-06-12' },
    //   // ...
    // ];
    
    // setLeaveRequests(leaveRequestsData);
  };

  const fetchWfhRequests = () => {
    // Fetch WFH requests from API and update state
    // Replace this with your actual API call

    const wfhRequestsData = [
      { id: 1, employeeName: 'Shawn Dsilva', startDate: '2023-06-01', endDate: '2023-06-05' },
      { id: 2, employeeName: 'Rahul Sharma', startDate: '2023-06-10', endDate: '2023-06-12' },
      { id: 3, employeeName: 'Dewain Diago', startDate: '2023-06-10', endDate: '2023-06-12' },
      { id: 4, employeeName: 'Jane Smith', startDate: '2023-06-10', endDate: '2023-06-12' },
      // ...
    ];

    setWfhRequests(wfhRequestsData);
  };

  const fetchUpcomingMeeting = () => {
    // Fetch upcoming meeting from API and update state
    // Replace this with your actual API call
    const upcomingMeetingData = {
      date: '2023-06-20',
      time: '10:00 AM',
    }; // Example meeting data
    setUpcomingMeeting(upcomingMeetingData);
  };

  const handleEmployeePress = (id,name,fromdate,todate,reason) => {
    // Navigate to another screen and pass employeeId as a prop
    navigation.navigate('AdminLeave', {id,name,fromdate,todate,reason});
  };

  const handleWfhPress = (employeeId) => {
    // Navigate to another screen and pass employeeId as a prop
    navigation.navigate('EmpDetails', { employeeId });
  };

  const handleLogout = () => {
    // Replace 'LoginScreen' with the name of the screen you want to navigate to after logout.
    navigation.navigate('Home');
  };

  const renderLeaveRequest = ({ item }) => (
    <TouchableOpacity onPress={() => handleEmployeePress(item.id,item.name,item.fromdate,item.todate,item.reason)}>
      <View style={styles.requestItem}>
        <Text style={styles.employeeName}>{item.name}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{item.fromdate}</Text>
          <Text style={styles.dateText}>to</Text>
          <Text style={styles.dateText}>{item.todate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  const renderWfhRequest = ({ item }) => (
    <TouchableOpacity onPress={() => handleWfhPress(item.id)}>
      <View style={styles.requestItem}>
        <Text style={styles.employeeName}>{item.employeeName}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{item.startDate}</Text>
          <Text style={styles.dateText}>to</Text>
          <Text style={styles.dateText}>{item.endDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );


  // Render other components...

//   const renderWfhRequest = ({ item }) => (
//     <View style={styles.requestItem}>
//       <Text style={styles.employeeName}>{item.employeeName}</Text>
//       <View style={styles.dateContainer}>
//         <Text style={styles.dateText}>{item.startDate}</Text>
//         <Text style={styles.dateText}>to</Text>
//         <Text style={styles.dateText}>{item.endDate}</Text>
//       </View>
//     </View>
//   );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.container}>
      {/* Add the logout icon in the header */}
      {/* <TouchableOpacity style={styles.logoutIconContainer} onPress={handleLogout}>
          <Ionicons name="exit-outline" size={24} color="black" />
        </TouchableOpacity>
      <Text style={styles.title}>Dashboard</Text> */}

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Leave Requests</Text>
        <View style={styles.countContainer}>
          <Text style={styles.count}>{leaveRequests.length}</Text>
          <Text style={styles.countLabel}>Pending</Text>
        </View>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContentContainer}>
          {leaveRequests.length > 0 ? (
            <FlatList
              data={leaveRequests}
              renderItem={renderLeaveRequest}
              keyExtractor={item => item.code.toString()}
            />
          ) : (
            <Text style={styles.noRequestsText}>No leave requests</Text>
          )}
        </ScrollView>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>WFH Requests</Text>
        <View style={styles.countContainer}>
          <Text style={styles.count}>{wfhRequests.length}</Text>
          <Text style={styles.countLabel}>Pending</Text>
        </View>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContentContainer}>
          {wfhRequests.length > 0 ? (
            <FlatList
              data={wfhRequests}
              renderItem={renderWfhRequest}
              keyExtractor={item => item.id.toString()}
            />
          ) : (
            <Text style={styles.noRequestsText}>No WFH requests</Text>
          )}
        </ScrollView>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Upcoming Meeting</Text>
        {upcomingMeeting ? (
          <View style={styles.meetingContainer}>
            <Text style={styles.meetingDate}>{upcomingMeeting.date}</Text>
            <Text style={styles.meetingTime}>{upcomingMeeting.time}</Text>
          </View>
        ) : (
          <Text style={styles.noMeetingText}>No upcoming meeting</Text>
        )}
      </View>
    </View>
    </SafeAreaView>
  );

};

// Styles and other code...

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#F4F4F4',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    sectionContainer: {
      marginBottom: 24,
      backgroundColor: '#FFFFFF',
      padding: 16,
      borderRadius: 8,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    countContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    count: {
      fontSize: 24,
      fontWeight: 'bold',
      marginRight: 8,
    },
    countLabel: {
      fontSize: 16,
      color: '#888888',
    },
    noRequestsText: {
      fontStyle: 'italic',
      marginTop: 8,
    },
    requestItem: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E5E5',
    },
    employeeName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dateText: {
      fontSize: 16,
      marginRight: 4,
    },
    meetingContainer: {
      alignItems: 'center',
    },
    meetingDate: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000000',
    },
    meetingTime: {
      fontSize: 14,
      color: '#888888',
    },
    noMeetingText: {
      fontStyle: 'italic',
      marginTop: 8,
    },
    scrollContainer: {
      maxHeight: Dimensions.get('window').height / 5,
    },
    scrollContentContainer: {
      flexGrow: 1,
    },
    logoutIconContainer: {
      position: 'absolute',
      top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      right: 16,
      padding: 8,
      zIndex: 1,
    },
  });

export default AdminDashboard;
