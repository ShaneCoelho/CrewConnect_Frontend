import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const Loading = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);

  const detectLogin= async ()=>{
    const token= await AsyncStorage.getItem('token')
    if(token){
      navigation.navigate("EmpDashboard")
    }else{
      navigation.navigate("EmpLogin")
    }
  }

  useEffect( ()=>{
    detectLogin()
  },[])


  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Loading;
