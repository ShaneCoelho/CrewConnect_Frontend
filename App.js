//import * as React from 'react';

import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmpDashboard from './screens/employee/EmpDashboard';
import Home from './screens/start/Home';
import EmpLogin from './screens/employee/EmpLogin';
import EmpSignup from './screens/employee/EmpSignup';
import AdminLogin from './screens/admin/AdminLogin';
import AdminDashboard from './screens/admin/AdminDashboard';
import EmpDetails from './screens/employee/EmpDetails';
import AdminLeave from './screens/admin/AdminLeave';
import EmpApply from './screens/employee/EmpApply';
import EmpLeave from './screens/employee/EmpLeave';
import Loading from './screens/start/Loading';
import AdminPastLeave from './screens/admin/AdminPastLeave';
import EmpProfile from './screens/employee/EmpProfile';
import EmpDrawerContent from './screens/employee/EmpDrawerContent';
import EmpPersonalInfo from './screens/employee/EmpPersonalInfo';
import EmpPastLeave from './screens/employee/EmpPastLeave';
import AdminDrawer from './screens/admin/AdminDrawer';
import AdminEmpSearch from './screens/admin/AdminEmpSearch';
import AdminMeeting from './screens/admin/AdminMeeting';
import AdminEmpProfiles from './screens/admin/AdminEmpProfiles';
import AdminMessageSearch from './screens/admin/AdminMessageSearch';
import AdminSendMessage from './screens/admin/AdminSendMessage';
import AdminSendNotice from './screens/admin/AdminSendNotice';
import EmpAnnouncement from './screens/employee/EmpAnnouncement';
import EmpWfh from './screens/employee/EmpWfh';
import AdminWfh from './screens/admin/AdminWfh';
import AdminPastLeave2 from './screens/admin/AdminPastLeave2';
import StartScreen from './screens/start/StartScreen';
import EmpUploadDoc from './screens/employee/EmpUploadDoc';
import AdminViewDoc from './screens/admin/AdminViewDoc';
import { Text, View, StyleSheet, Screen } from 'react-native';
import Constants from 'expo-constants';


const Stack = createNativeStackNavigator();

const App = () => {

  const [isLoggedin, setLogged] = useState(null)

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
                  <Stack.Screen name="EmpLeave" component={EmpLeave} options={{ title: 'Leave' }} />
                  <Stack.Screen options={{ headerShown: false }} name="EmpDetails" component={EmpDetails} />
                  {/* <Stack.Screen options={{ headerShown: false }} name="AdminDashboard" component={AdminDashboard} /> */}
                  <Stack.Screen options={{ headerShown: false }} name="AdminDrawer" component={AdminDrawer} />
                  <Stack.Screen options={{ headerShown: false }} name="AdminLeave" component={AdminLeave} />
                  <Stack.Screen options={{ headerShown: false }} name="AdminEmpSearch" component={AdminEmpSearch} />
                  <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
                  <Stack.Screen options={{ headerShown: false }} name="EmpLogin" component={EmpLogin} />
                  <Stack.Screen options={{ headerShown: false }} name="EmpSignup" component={EmpSignup} />
                  <Stack.Screen options={{ headerShown: false }} name="AdminPastLeave" component={AdminPastLeave} />
                  <Stack.Screen options={{ headerShown: false }} name="AdminPastLeave2" component={AdminPastLeave2} />
                  <Stack.Screen options={{ headerShown: false }} name="EmpPersonalInfo" component={EmpPersonalInfo} />
                  <Stack.Screen options={{ headerShown: false }} name="EmpPastLeave" component={EmpPastLeave} />
                  <Stack.Screen options={{ headerShown: false }} name="AdminViewDoc" component={AdminViewDoc} />
                  <Stack.Screen name="AdminMeeting" component={AdminMeeting} options={{ title: 'Set Meeting and Holiday' }} />
                  <Stack.Screen name="AdminEmpProfiles" component={AdminEmpProfiles} options={{ title: 'Employee Profile' }} />
                  <Stack.Screen options={{ headerShown: false }} name="AdminMessageSearch" component={AdminMessageSearch} />
                  <Stack.Screen name="AdminSendMessage" component={AdminSendMessage} options={{ title: 'Push Notification' }} />
                  <Stack.Screen name="AdminSendNotice" component={AdminSendNotice} options={{ title: 'Send Announcement' }} />
                  <Stack.Screen name="EmpUploadDoc" component={EmpUploadDoc} options={{ title: 'Send Documents' }} />
                  <Stack.Screen name="EmpWfh" component={EmpWfh} options={{ title: 'Work From Home' }} />
                  <Stack.Screen options={{ headerShown: false }} name="AdminWfh" component={AdminWfh} />
                  <Stack.Screen options={{ headerShown: false }} name="EmpAnnouncement" component={EmpAnnouncement} />
                  {/* <Stack.Screen options={{ headerShown: false }} name="EmpDrawerContent" component={EmpDrawerContent} /> */}
                  <Stack.Screen name="EmpProfile" component={EmpProfile} options={{ title: 'Profile' }} />
                  <Stack.Screen options={{ headerShown: false }} name="AdminLogin" component={AdminLogin} />

                </>

              )
              :
              (


                <>
                  <Stack.Screen options={{ headerShown: false }} name="StartScreen" component={StartScreen} />
                  <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
                  <Stack.Screen options={{ headerShown: false }} name="EmpLogin" component={EmpLogin} />
                  <Stack.Screen options={{ headerShown: false }} name="EmpSignup" component={EmpSignup} />
                  <Stack.Screen options={{ headerShown: false }} name="AdminLogin" component={AdminLogin} />
                  <Stack.Screen options={{ headerShown: false }} name="EmpDashboard" component={EmpDashboard} />
                  <Stack.Screen options={{ headerShown: false }} name="EmpApply" component={EmpApply} />
                  <Stack.Screen name="EmpLeave" component={EmpLeave} options={{ title: 'Leave' }} />
                  <Stack.Screen options={{ headerShown: false }} name="EmpDetails" component={EmpDetails} />
                  {/* <Stack.Screen options={{ headerShown: false }} name="AdminDashboard" component={AdminDashboard} /> */}
                  <Stack.Screen options={{ headerShown: false }} name="AdminDrawer" component={AdminDrawer} />
                  <Stack.Screen options={{ headerShown: false }} name="AdminEmpSearch" component={AdminEmpSearch} />
                  <Stack.Screen options={{ headerShown: false }} name="AdminPastLeave" component={AdminPastLeave} />
                  <Stack.Screen options={{ headerShown: false }} name="EmpPersonalInfo" component={EmpPersonalInfo} />
                  <Stack.Screen options={{ headerShown: false }} name="AdminPastLeave2" component={AdminPastLeave2} />
                  <Stack.Screen options={{ headerShown: false }} name="AdminViewDoc" component={AdminViewDoc} />
                  <Stack.Screen name="EmpProfile" component={EmpProfile} options={{ title: 'Profile' }} />
                  <Stack.Screen options={{ headerShown: false }} name="EmpPastLeave" component={EmpPastLeave} />
                  <Stack.Screen name="AdminMeeting" component={AdminMeeting} options={{ title: 'Set Meeting and Holiday' }} />
                  <Stack.Screen name="AdminEmpProfiles" component={AdminEmpProfiles} options={{ title: 'Employee Profile' }} />
                  <Stack.Screen name="AdminSendMessage" component={AdminSendMessage} options={{ title: 'Push Notification' }} />
                  <Stack.Screen name="AdminSendNotice" component={AdminSendNotice} options={{ title: 'Send Announcement' }} />
                  <Stack.Screen name="EmpUploadDoc" component={EmpUploadDoc} options={{ title: 'Send Documents' }} />
                  <Stack.Screen name="EmpWfh" component={EmpWfh} options={{ title: 'Work From Home' }} />
                  <Stack.Screen options={{ headerShown: false }} name="AdminWfh" component={AdminWfh} />
                  <Stack.Screen options={{ headerShown: false }} name="EmpAnnouncement" component={EmpAnnouncement} />
                  <Stack.Screen options={{ headerShown: false }} name="AdminMessageSearch" component={AdminMessageSearch} />
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