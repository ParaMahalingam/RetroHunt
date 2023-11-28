import React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from "react-native-paper";

const Input = ({ inputvalue, label, multi, hidePassword, value }) => {
    return (
        <TextInput
            style={multi ? styles.multiinput : styles.input}
            label={label}
            value={value}
            multiline={multi ?? false}
            onChangeText={inputvalue}
            secureTextEntry={hidePassword}
        />
    )
}
const styles = StyleSheet.create({
    input: {
        margin: 10
    },
    multiinput: {
        margin: 10,
        height: 150,
    }
})

export default Input