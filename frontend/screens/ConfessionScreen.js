import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, ImageBackground } from 'react-native';
import axios from 'axios';

const ConfessionScreen = ({ navigation }) => {
    const [confession, setConfession] = useState('');
    const [confessionImage, setConfessionImage] = useState(null);

    const handleNext = async () => {
        try {
            console.log('posting', confession);
            const response = await axios.post('backend link', { confession });

            const success = response.status === 201;

            if (success) {
                navigation.navigate('Login');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred during login');
            console.error(error);
        }
    };

    const setImage = (image) => {
        setConfessionImage(image);
    };

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={require('../Images/leaf.jpg')}
                style={styles.background}>
                <Text style={styles.text}>Confession</Text>
                <View style={styles.inputContainer}>
                    {confessionImage && (
                        <Image 
                            source={confessionImage}
                            style={styles.inputImage} 
                        />
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Your confession"
                        placeholderTextColor="white" 
                        value={confession}
                        onChangeText={setConfession}
                        multiline
                        textAlign="center"
                        textAlignVertical="center"
                    />
                </View>
                
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageButton} onPress={() => setImage(require('../Images/retro_gradient.webp'))}>
                    <Image style={styles.image} source={require('../Images/retro_gradient.webp')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageButton} onPress={() => setImage(require('../Images/blue_black_gradient.jpg'))}>
                    <Image style={styles.image} source={require('../Images/blue_black_gradient.jpg')} />
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 50,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 50,
        fontFamily: 'Honk',
    },
    inputContainer: {
        width: '80%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 200,
        width: '80%',
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        fontSize: 20,
        color: 'white',
    },
    inputImage: {
        position: 'absolute',
        bottom: 20,
        width: '80%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007BFF',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    imageButton: {
        backgroundColor: '#007BFF',
        borderRadius: 50,
        paddingVertical: 5,
        paddingHorizontal: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
    }
});

export default ConfessionScreen;
