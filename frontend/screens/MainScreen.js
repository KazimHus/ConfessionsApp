import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import CarouselCardItem from '../components/carousel';

const MainScreen = ({ navigation }) => {
    const [confessions, setConfessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConfessions = async () => {
            try {
                const response = await axios.get('http://10.0.0.53:8000/carousel');
                setConfessions(response.data);
            } catch (error) {
                Alert.alert('Error', 'An error occurred while fetching confessions');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchConfessions();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    const testing = () => {
        navigation.navigate('Confession');
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={confessions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <CarouselCardItem item={item} />}
                contentContainerStyle={styles.flatListContent}
            />
            <TouchableOpacity style={styles.button} onPress={testing}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatListContent: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    button: {
        borderRadius: 10, // Rounded corners
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
        bottom: 20,
        width:'50%',
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
    },
    buttonText: {
        color: '#FFFFFF', // Button text color
        fontSize: 20,
        alignSelf: 'center',
    },
});

export default MainScreen;
