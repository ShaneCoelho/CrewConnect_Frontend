import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons from @expo/vector-icons
import { SafeAreaView, StatusBar, Platform, BackHandler } from 'react-native';

const dummyData = [
  { id: '1', name: 'John Doe', designation: 'Software Engineer' },
  { id: '2', name: 'Jane Smith', designation: 'Product Manager' },
  { id: '3', name: 'Robert Johnson', designation: 'UI/UX Designer' },
  { id: '4', name: 'Julia Roberts', designation: 'Frontend Developer' },
  { id: '5', name: 'Jennifer Aniston', designation: 'Financial Analyst' },
  { id: '6', name: 'Lana Dsouza', designation: 'Accountant' },
  { id: '7', name: 'James Gomes', designation: 'UI/UX executive' },
  { id: '8', name: 'Quency Jules', designation: 'Junior Associate' },
  { id: '9', name: 'Robby Lobo', designation: 'Jr. Accountant' },
  { id: '10', name: 'Mike Ross', designation: 'Senior Associate' },
  { id: '11', name: 'Rachel Zane', designation: 'Paralegal' },
  { id: '12', name: 'Mike Ross', designation: 'Senior Associate' },
  { id: '13', name: 'Rachel Zane', designation: 'Paralegal' },
  { id: '14', name: 'dsgs Zane', designation: 'Paralegal' },


  // Dummy contacts data...
];

const AdminEmpSearch = ({navigation,navigation:{goBack}}) => {
  
  const [employeeData, setEmployeeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);


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

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetchEmployees();
  }, []);



  // Function to handle the search icon press
  const handleSearchIconPress = () => {
    // Filter contacts based on the search query
    const filtered = employeeData.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.designation.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  // Function to handle the search input change
  const handleSearchInputChange = (text) => {
    setSearchQuery(text);

    // Filter contacts based on the current search query
    const filtered = employeeData.filter(
      (contact) =>
        contact.name.toLowerCase().includes(text.toLowerCase()) ||
        contact.designation.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  // Function to clear the search filter
  const clearSearchFilter = () => {
    setSearchQuery('');
    setFilteredContacts(employeeData);
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('https://213a-45-114-251-176.ngrok-free.app/fetchemployees', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      //console.log(data)
      setEmployeeData(data);
      console.log(employeeData)
      setFilteredContacts(data)
      console.log(filteredContacts)
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.contactItem}>
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.designation}>{item.designation}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.container}>
      {/* Display the search icon on the right side */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search employees..."
          onChangeText={handleSearchInputChange}
          value={searchQuery}
        />
        <TouchableOpacity onPress={handleSearchIconPress}>
          <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>
        {/* Add a "Clear" button */}
        {!!searchQuery && (
          <TouchableOpacity onPress={clearSearchFilter}>
            <Text style={styles.clearButton}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={filteredContacts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align the icon to the right
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  contactItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  designation: {
    fontSize: 14,
    color: '#888',
  },
  clearButton: {
    color: 'black',
  },
});

export default AdminEmpSearch;