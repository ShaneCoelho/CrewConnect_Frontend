import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView, StatusBar, Platform, BackHandler } from 'react-native';


const AdminMeeting = ({ navigation, navigation: { goBack } }) => {

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

    const [isMeetingDatePickerVisible, setMeetingDatePickerVisible] = useState(false);
    const [isMeetingTimePickerVisible, setMeetingTimePickerVisible] = useState(false);

    const [selectedMeetingDate, setSelectedMeetingDate] = useState(new Date());
    const [selectedMeetingTime, setSelectedMeetingTime] = useState('');

    const [isHolidayDatePickerVisible, setHolidayDatePickerVisible] = useState(false);

    const [selectedHolidayDate, setSelectedHolidayDate] = useState(new Date());

    const showMeetingDatePicker = () => {
        setMeetingDatePickerVisible(true);
    };

    const hideMeetingDatePicker = () => {
        setMeetingDatePickerVisible(false);
    };

    const handleMeetingDateConfirm = date => {
        setSelectedMeetingDate(date);
        hideMeetingDatePicker();
    };

    const showMeetingTimePicker = () => {
        setMeetingTimePickerVisible(true);
    };

    const hideMeetingTimePicker = () => {
        setMeetingTimePickerVisible(false);
    };

    const handleMeetingTimeConfirm = time => {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        setSelectedMeetingTime(`${hours}:${minutes}`);
        hideMeetingTimePicker();
    };

    const handleSetMeeting = async () => {
        console.log('Meeting set for:', selectedMeetingDate, selectedMeetingTime);
    
        if (!selectedMeetingTime) {
            Alert.alert('Error', 'Please select a meeting time');
            return;
        }
    
        // Create the data payload
        const meetingData = {
            meetingdate: selectedMeetingDate.toDateString(),
            meetingtime: selectedMeetingTime,
        };
    
        try {
            const response = await fetch("https://crewconnect.onrender.com/addmeeting", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(meetingData),
            });
    
            if (response.ok) {
                Alert.alert('Success', 'Meeting data submitted successfully');
            } else {
                Alert.alert('Error', 'Failed to submit meeting data');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'An error occurred while submitting data');
        }
    };

    const showHolidayDatePicker = () => {
        setHolidayDatePickerVisible(true);
    };

    const hideHolidayDatePicker = () => {
        setHolidayDatePickerVisible(false);
    };

    const handleHolidayDateConfirm = date => {
        setSelectedHolidayDate(date);
        hideHolidayDatePicker();
    };

    const handleDeclareHoliday = async() => {
        console.log('Meeting set for:', selectedMeetingDate, selectedMeetingTime);
    
    
        // Create the data payload
        const meetingData = {
            holidaydate: selectedHolidayDate.toDateString(),
        };
    
        try {
            const response = await fetch("https://crewconnect.onrender.com/addholiday", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(meetingData),
            });
    
            if (response.ok) {
                Alert.alert('Success', 'Holiday data submitted successfully');
            } else {
                Alert.alert('Error', 'Failed to submit holiday data');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'An error occurred while submitting data');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Set Meeting</Text>
                <TouchableOpacity style={styles.datePickerButton} onPress={showMeetingDatePicker}>
                    <Text style={styles.datePickerButtonText}>
                        {selectedMeetingDate.toDateString()}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.datePickerButton} onPress={showMeetingTimePicker}>
                    <Text style={styles.datePickerButtonText}>
                        {selectedMeetingTime || 'Select time'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSetMeeting}>
                    <Text style={styles.buttonText}>Set Meeting</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isMeetingDatePickerVisible}
                    mode="date"
                    onConfirm={handleMeetingDateConfirm}
                    onCancel={hideMeetingDatePicker}
                />
                <DateTimePickerModal
                    isVisible={isMeetingTimePickerVisible}
                    mode="time"
                    onConfirm={handleMeetingTimeConfirm}
                    onCancel={hideMeetingTimePicker}
                />
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Declare Holiday</Text>
                <TouchableOpacity style={styles.datePickerButton} onPress={showHolidayDatePicker}>
                    <Text style={styles.datePickerButtonText}>
                        {selectedHolidayDate.toDateString()}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleDeclareHoliday}>
                    <Text style={styles.buttonText}>Declare Holiday</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isHolidayDatePickerVisible}
                    mode="date"
                    onConfirm={handleHolidayDateConfirm}
                    onCancel={hideHolidayDatePicker}
                />
            </View>
        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('5%'),
        backgroundColor: '#f8f8f8',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    section: {
        marginBottom: hp('3%'),
        backgroundColor: 'white',
        padding: wp('5%'),
        borderRadius: wp('2%'),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: hp('0.5%'),
        },
        shadowOpacity: 0.25,
        shadowRadius: wp('2%'),
        elevation: 5,
    },
    sectionHeader: {
        fontSize: hp('2.5%'),
        fontWeight: 'bold',
        marginBottom: hp('2%'),
    },
    datePickerButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: hp('1.5%'),
        marginBottom: hp('2%'),
        borderRadius: wp('1%'),
    },
    datePickerButtonText: {
        fontSize: hp('2%'),
    },
    button: {
        backgroundColor: '#007AFF',
        padding: hp('2%'),
        borderRadius: wp('2%'),
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: hp('2.5%'),
        fontWeight: 'bold',
    },
});

export default AdminMeeting;
