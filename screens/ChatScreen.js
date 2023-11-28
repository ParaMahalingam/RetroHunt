import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, View, FlatList, Image, KeyboardAvoidingView, Keyboard } from "react-native";
import { TextInput, Button, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import io from 'socket.io-client';
import Header from "../components/Header";
let socket;

function ChatScreen({ route, navigation }) {

    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);


    function initiateSocket(room) {
        socket = io(global.API_URL, { transports: ['websocket'] });
        console.log(`Connecting user to room...`);
        if (socket && room) socket.emit('join', room);
    }

    function disconnectSocket() {
        console.log('Disconnecting user!');
        if (socket) socket.disconnect();
    }

    function subscribeToChat(cb) {
        if (!socket) return (true);
        socket.on('chat', msg => {
            console.log('Message received!');
            return cb(null, msg);
        });
    }

    function sendMessage(message) {
        if (socket) socket.emit('chat', message)
    }

    useEffect(() => {
        if (room) initiateSocket(room);
        subscribeToChat((err, data) => {
            if (err) return;
            setChat(oldChats => [data, ...oldChats])

        });
        return () => {
            disconnectSocket();
        }
    }, [room]);


    useFocusEffect(
        useCallback(() => {
            if (route.params?.room) {
                setRoom(route.params.room)
            }
            else {
                setRoom(global.ID)
            }
        }, [room, route])
    );
    const ListItem = ({ msg }) => {
        return (
            <View style={styles.row}>
                <Image style={styles.avatar} source={{ uri: global.IMAGE_URL + "/mobile/uploads/placeholder.jpg" }} />
                <View style={styles.rowText}>

                    <Text style={styles.sender}>{msg.author === global.Username ? 'You' : msg.author}</Text>
                    <Text style={styles.message}>{msg.message}</Text>
                </View>
            </View>
        );
    };

    function send() {
        const messageData = {
            room: room,
            author: global.Username,
            message: message,
            time:
                new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
        };

        sendMessage(messageData)
        setMessage("")
    }

    useLayoutEffect(() => {
        navigation.setOptions({headerRight: () => (<Button onPress={() => { navigation.setParams({ room: null }); setRoom(global.ID); setChat([]) }}>Reset</Button>)});
    }, [navigation]);

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <View style={styles.inner}>
                <Header value="CHAT" />
                <FlatList
                    nestedScrollEnabled
                    data={chat}
                    inverted
                    ItemSeparatorComponent={(props) => {
                        return (<View style={{ height: 1, backgroundColor: 'gray' }} />);
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <ListItem msg={item} />}
                />
                <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={-80}>
                    <TextInput
                        label="Reply"
                        value={message}
                        onChangeText={chatMessage => { setMessage(chatMessage) }}
                    />
                    <Button mode="outlined" icon="send" onPress={() => { Keyboard.dismiss(), send() }}>Send</Button>
                </KeyboardAvoidingView>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        padding: 20,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    avatar: {
        borderRadius: 20,
        width: 40,
        height: 40,
        marginRight: 10
    },
    rowText: {
        flex: 1
    },
    message: {
        fontSize: 18
    },
    sender: {
        fontWeight: 'bold',
        paddingRight: 10
    }
})
export default ChatScreen;