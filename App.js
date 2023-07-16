//import * as React from 'react';

import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmpDashboard from './screens/EmpDashboard';
import Home from './screens/Home';
import EmpLogin from './screens/EmpLogin';
import EmpSignup from './screens/EmpSignup';
import AdminLogin from './screens/AdminLogin';
import AdminDashboard from './screens/AdminDashboard';
import EmpDetails from './screens/EmpDetails';
import AdminLeave from './screens/AdminLeave';
import EmpApply from './screens/EmpApply';
import EmpLeave from './screens/EmpLeave';
import Loading from './screens/Loading';
import AdminPastLeave from './screens/AdminPastLeave';
import EmpProfile from './screens/EmpProfile';
import EmpDrawerContent from './screens/EmpDrawerContent';
import { Text, View, StyleSheet, Screen } from 'react-native';
import Constants from 'expo-constants';


const Stack = createNativeStackNavigator();

const App = () => {

  const [isLoggedin,setLogged]=useState(null)

  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      setLogged(true)
    } else {
      setLogged(false)
    }
  }

  useEffect(() => {
    detectLogin()
  }, [])

  return (
   
    <NavigationContainer>
      <Stack.Navigator>

        {
          isLoggedin == null ?
            (
              <Stack.Screen options={{ headerShown: false }} name="Loading" component={Loading} />
            )
            :
            isLoggedin == true ?
            (

              <>
                <Stack.Screen options={{ headerShown: false }} name="EmpDashboard" component={EmpDashboard} />
                <Stack.Screen options={{ headerShown: false }} name="EmpApply" component={EmpApply} />
                <Stack.Screen name="EmpLeave" component={EmpLeave} />
                <Stack.Screen options={{ headerShown: false }} name="EmpDetails" component={EmpDetails} />
                <Stack.Screen options={{ headerShown: false }} name="AdminDashboard" component={AdminDashboard} />
                <Stack.Screen options={{ headerShown: false }} name="AdminLeave" component={AdminLeave} />
                <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
                <Stack.Screen options={{ headerShown: false }} name="EmpLogin" component={EmpLogin} />
                <Stack.Screen options={{ headerShown: false }} name="EmpSignup" component={EmpSignup} />
                <Stack.Screen options={{ headerShown: false }} name="AdminPastLeave" component={AdminPastLeave} />
                {/* <Stack.Screen options={{ headerShown: false }} name="EmpDrawerContent" component={EmpDrawerContent} /> */}
                <Stack.Screen name="EmpProfile" component={EmpProfile} />
                <Stack.Screen options={{ headerShown: false }} name="AdminLogin" component={AdminLogin} />

              </>
              
            )
            :
            (
              

              <>
                <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
                <Stack.Screen options={{ headerShown: false }} name="EmpLogin" component={EmpLogin} />
                <Stack.Screen options={{ headerShown: false }} name="EmpSignup" component={EmpSignup} />
                <Stack.Screen options={{ headerShown: false }} name="AdminLogin" component={AdminLogin} />
                <Stack.Screen options={{ headerShown: false }} name="EmpDashboard" component={EmpDashboard} />
                <Stack.Screen options={{ headerShown: false }} name="EmpApply" component={EmpApply} />
                <Stack.Screen name="EmpLeave" component={EmpLeave} />
                <Stack.Screen options={{ headerShown: false }} name="EmpDetails" component={EmpDetails} />
                <Stack.Screen options={{ headerShown: false }} name="AdminDashboard" component={AdminDashboard} />
                <Stack.Screen options={{ headerShown: false }} name="AdminPastLeave" component={AdminPastLeave} />
                <Stack.Screen  name="EmpProfile" component={EmpProfile} />
                {/* <Stack.Screen options={{ headerShown: false }} name="EmpDrawerContent" component={EmpDrawerContent} /> */}
                <Stack.Screen options={{ headerShown: false }} name="AdminLeave" component={AdminLeave} />


              </>
            )
        }



      </Stack.Navigator>
    </NavigationContainer>
   

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default App;