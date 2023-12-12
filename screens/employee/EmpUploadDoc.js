import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import ImagePicker from 'react-native-image-picker';
import FilePickerManager from 'react-native-file-picker';
import { SafeAreaView, StatusBar, Platform, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { XMLHttpRequest } from 'react-native';


const EmpUploadDoc = ({ navigation, navigation: { goBack } }) => {

    const [description, setDescription] = useState('');
    const [selectedDocument, setSelectedDocument] = useState(null);

    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);



    const handleDocumentSelection = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync();

            if (result.type === 'success') {
                setSelectedDocument(result);
                console.log(result)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSend = async () => {

        const token = await AsyncStorage.getItem('token');
        
        if (!selectedDocument || !description) {
            alert('Please select a document and provide a description.');
            return;
        }

        console.log(selectedDocument.type)

        const formData = new FormData();
        formData.append('description', description);
        formData.append('file', {
            name: selectedDocument.name,
            uri: selectedDocument.uri,
            type: selectedDocument.mimeType,
        });

        console.log(formData)

        try {
            
            const response = await fetch("https://crewconnect.onrender.com/sharefile", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                    
                },
                body: formData,
            });

            console.log('Response Status:', response.status);

            if (response.status === 200) {
                // Successfully uploaded the document and description
                alert('Document uploaded successfully.');
                // Clear the form or navigate to another screen
                setDescription('');
                setSelectedDocument(null);
            } else {
                alert('Error uploading the document.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error uploading the document.');
        }
    };


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.container}>
                <Text style={styles.label}>Description:</Text>
                <TextInput
                    multiline
                    style={styles.textArea}
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    placeholder="Enter description"
                />

                <TouchableOpacity style={styles.button} onPress={handleDocumentSelection}>
                    <Text style={styles.buttonText}>Select Document</Text>
                </TouchableOpacity>

                {selectedDocument && (
                    <Text style={styles.selectedDocument}>
                        Selected Document: {selectedDocument.name}
                    </Text>
                )}

                <TouchableOpacity style={styles.button} onPress={handleSend}>
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    label: {
        fontSize: 30,
        marginBottom: 10,
    },
    textArea: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingLeft: 10,
    },
    selectedDocument: {
        fontSize: 16,
        marginTop: 10,
    },
    button: {
        backgroundColor: '#007BFF', // Custom button color
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white', // Button text color
        fontSize: 16,
    },
})

export default EmpUploadDoc;
