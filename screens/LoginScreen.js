import React, { useState } from 'react';
import { ScrollView, StyleSheet, Platform } from 'react-native';
import { Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import axios from 'axios';
import Input from "../components/Input";
import Header from "../components/Header";

function LoginScreen({ route, navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function login() {
        try {
            const response = await axios.get(global.API_URL + "/api/user/login", { params: { username: username, password: password } })
            var r = response.data;
            if (r.loggedIn) {
                await AsyncStorage.setItem('ID', r.ID.toString())
                await AsyncStorage.setItem('Name', r.Name)
                await AsyncStorage.setItem('Username', r.Username)
                await AsyncStorage.setItem('Borough', r.Borough)
                await AsyncStorage.setItem('loggedIn', 'true')
                if (Platform.OS === 'web') {
                    window.location.reload();
                }
                else {
                    await Updates.reloadAsync();
                }
            }
            else {
                alert("Incorrect username or password!")
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ScrollView style={styles.container}>

            <Header value="LOGIN" />

            <Input inputvalue={setUsername} value={username} label="Username" />
            <Input inputvalue={setPassword} value={password} hidePassword={true} label="Password" />

            <Text style={styles.accountLabel} onPress={() => navigation.navigate('Register')} >Don't have an account? Click here to register</Text>

            <Button mode="contained" icon="login" onPress={() => { login() }} style={{ margin: 20 }} labelStyle={{ fontSize: 25 }}>Login</Button>
        </ScrollView>
    );


};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    accountLabel: {
        fontSize: 17,
        justifyContent: 'center',
        margin: 10,
        alignSelf: 'center',
        color: '#6200ee'
    },
})
export default LoginScreen;