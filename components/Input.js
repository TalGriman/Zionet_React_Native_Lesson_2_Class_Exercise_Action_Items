import React from "react";
import { View, TextInput, StyleSheet } from 'react-native';

const Input = (props) => {
    // props
    const { containerStyle, inputStyle, selectionColor } = props;
    return (
        <View style={{ ...styles.container, ...containerStyle }}>
            <TextInput {...props} selectionColor={selectionColor ? selectionColor : "black"} style={{ ...styles.input, ...inputStyle }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center"
    },
    input: {
        width: "100%",
        textAlign:"center"
    }
});

export default Input;