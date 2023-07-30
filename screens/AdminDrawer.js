import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import AdminDashboard from './AdminDashboard'; // Make sure to import the original AdminDashboard component

const Drawer = createDrawerNavigator();

const ProfileDrawerContent = ({navigation}) => {

    const handleLogout = () => {
        // Replace 'LoginScreen' with the name of the screen you want to navigate to after logout.
        navigation.navigate('Home');
      };

      const handleEmployeeSearch = () => {
        // Replace 'LoginScreen' with the name of the screen you want to navigate to after logout.
        navigation.navigate('AdminEmpSearch');
      };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.drawerContent}>
      <View style={styles.profileContainer}>
        <Image
          source={require('./favicon.png')} // Replace with the actual path to the profile photo
          style={styles.profilePhoto}
        />
        <Text style={styles.name}>John Doe</Text>
      </View>
      <TouchableOpacity style={styles.optionContainer} onPress={() => handleOptionPress('MessageEmployee')}>
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#888" style={styles.optionIcon} />
        <Text style={styles.optionText}>Message Employee</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer} onPress={handleEmployeeSearch}>
        <Ionicons name="search-outline" size={24} color="#888" style={styles.optionIcon} />
        <Text style={styles.optionText}>Search Employee</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer} onPress={() => handleOptionPress('Meeting')}>
        <Ionicons name="calendar-outline" size={24} color="#888" style={styles.optionIcon} />
        <Text style={styles.optionText}>Meeting</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer} onPress={handleLogout}>
        <Ionicons name="exit-outline" size={24} color="#888" style={styles.optionIcon} />
        <Text style={styles.optionText}>Logout</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={ProfileDrawerContent}>
      <Drawer.Screen name="Dashboard" component={AdminDashboard} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5', // Set the background color here
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      },
      profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff', // Set the background color for the profile section
        paddingVertical: 20,
        borderRadius: 10,
      },
      profilePhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
      },
      name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
      },
      optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: '#fff', // Set the background color for the option
        padding: 10,
        borderRadius: 8,
        elevation: 2,
      },
      optionIcon: {
        marginRight: 10,
      },
      optionText: {
        fontSize: 18,
        color: '#333',
      },
});

export default DrawerNavigator;
