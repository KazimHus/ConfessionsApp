import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      console.log('posting', email, password)
      const response = await axios.post('backend link', { email, password });

      const success = response.status === 200;

      if (success) {
        navigation.navigate('Main');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login');
      console.error(error);
    }
  }
  const testing = () => {
    navigation.navigate('Main');
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../Images/leaf.jpg')}
        style={styles.background}
      >
        <Text style={styles.title}>Log In</Text>
        <View style = {styles.opaguecontainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        </View>       
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={testing}>
          <Text style={styles.buttonText}>Next</Text>
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
  title: {
    fontSize: 40,
    marginBottom: 20,
    textAlign: 'center',
    padding: 20,
    color: 'white'
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
    fontSize: 15,
  },
  opaguecontainer:
  {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(200, 255, 200, 0.5)',
    borderRadius: 8,
    marginBottom: 20
  },
  button: {
    borderRadius: 10, // Rounded corners
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonText: {
    color: '#FFFFFF', // Button text color
    fontSize: 20,
  },
});

export default LoginScreen;
