import React, {useEffect} from 'react';
import {Text, View, Button, Alert, BackHandler} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmpDetails = ({navigation,navigation:{goBack}}) => {

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

  const handleLogout=()=>{
    AsyncStorage.clear().then(()=>{
      navigation.navigate("Home")
    })
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};
export default EmpDetails;