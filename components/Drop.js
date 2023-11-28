import React, { useState } from "react";
import { View, StyleSheet } from 'react-native';
import DropDown from "react-native-paper-dropdown";

const Drop = ({ value, setValue, list, label, noMargin }) => {
    const [showDropDown, setShowDropDown] = useState(false);
    return (
        <View style={noMargin ? null : styles.drop}>
            <DropDown
                label={label}
                mode={"outlined"}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={value}
                setValue={setValue}
                list={list}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    drop: {
        margin: 10
    }
})

export default Drop