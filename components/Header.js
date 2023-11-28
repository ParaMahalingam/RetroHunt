import React from 'react'
import { StyleSheet, Text } from 'react-native'

const Header = ({ value }) => {
    return (
        <Text style={styles.header}>{value}</Text>
    )
}
const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        justifyContent: 'center',
        margin: 10,
        alignSelf: 'center',
        color: '#6200ee'
    }
})

export default Header