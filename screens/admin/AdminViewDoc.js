import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';
import { SafeAreaView, StatusBar, Platform, BackHandler } from 'react-native';

const AdminViewDoc = ({navigation,navigation:{goBack}}) => {
  const [documents, setDocuments] = useState([]);
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [documentUrl, setDocumentUrl] = useState(null);

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
    fetchDocuments();
  }, [documents]);


  const onViewDocument = (documentUrl) => {
    setDocumentUrl(documentUrl);
    setWebViewVisible(true);
  };

  const fetchDocuments = async () => {
    try {
      const response = await fetch('https://crewconnect.onrender.com/viewuploadeddoc', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      //console.log(data)
      setDocuments(data);
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  const renderBackButton = () => {
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setWebViewVisible(false)}
      >
        <Icon name="arrow-back" size={30} color="#0077B6" />
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {

    const time=item.time.toString();
    const date=item.date.toString();
    const dateTime=time+" "+date;
    return (
      <TouchableOpacity
        onPress={() => onViewDocument(item.publicUrl)}
        style={styles.documentContainer}
      >
        <View style={styles.documentInfo}>
          <Text style={styles.senderName}>{item.name}</Text>
          <Text style={styles.dateTime}>{dateTime}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <Icon name="document-text" size={30} color="#0077B6" />
      </TouchableOpacity>
    );
  };

  if (webViewVisible) {
    return (
      <View style={{ flex: 1 }}>
        {renderBackButton()}
        <WebView
          source={{ uri: documentUrl }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          style={{ flex: 1 }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.container}>
      <Text style={styles.title}>Received Documents</Text>
      <FlatList
        data={documents}
        keyExtractor={(item) => item.time.toString()}
        renderItem={renderItem}
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  documentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  documentInfo: {
    flex: 1,
  },
  senderName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateTime: {
    color: 'gray',
  },
  description: {
    marginTop: 5,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 16,
    zIndex: 1,
  },
});

export default AdminViewDoc;
