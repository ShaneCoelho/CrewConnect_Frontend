import React ,{useEffect,useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView, StatusBar, Platform, BackHandler } from 'react-native';

const AdminEmpProfiles = ({ navigation, navigation: { goBack }, route }) => {

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


  const employee = {
    // ... employee data ...
    profileImage: require('../../assets/images/favicon.png'),
    id: 'EMP123',
    name: 'John Doe',
    phone: '123-456-7890',
    email: 'john.doe@example.com',
    address: '1234 Elm Street, City',
    designation: 'Software Engineer',
    pastLeaves: 10,
  };

  const {id,employeeId,name,designation,phone,email,address,Avatar} = route.params;


  const handleViewPastLeaves=()=>{
    console.log(id)
    navigation.navigate('AdminPastLeave2', {employeeId});
  }

  const windowWidth = Dimensions.get('window').width;

  const isSmallScreen = windowWidth <= 360; // Adjust the breakpoint as needed



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{uri:Avatar}||require('../../assets/images/favicon.png')} style={styles.profileImage} />
        <Text style={[styles.name, isSmallScreen && styles.smallText]}>
          {name}
        </Text>
        <Text style={[styles.designation, isSmallScreen && styles.smallText]}>
          {designation}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        {/* Employee Info */}
        <View style={styles.infoItem}>
          <Text style={styles.label}>Employee ID:</Text>
          <Text style={styles.value}>{employeeId}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{phone}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{email}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{address}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={handleViewPastLeaves}
      >
        <View style={styles.optionButton}>
          <Text style={styles.optionButtonText}>View Past Leaves</Text>
        </View>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  name: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  designation: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 16,
  },
  infoContainer: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
  },
  infoItem: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
  },
  optionContainer: {
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  optionButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AdminEmpProfiles;
