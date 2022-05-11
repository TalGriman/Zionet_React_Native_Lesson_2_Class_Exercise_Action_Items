import React, { useState } from "react";
import { View, StyleSheet, Texts, TextInput } from 'react-native';
import { Headline, Button } from 'react-native-paper';
import Input from "./Input";

const TopArea = (props) => {
    // props
    const {
        containerStyle,
        wraperStyle,
        btnStyle,
        btnContainerStyle,
        headlineText,
        confrimButtonAction,
        declineButtonAction,
        confirmButtonTitle,
        declineButtonTitle,
        confirmButtonColor,
        declineButtonColor,
        textValue,
        handleOnChangeText,
        placeHolder
    } = props;
    return (
        <View style={{ ...styles.container, ...containerStyle }}>
            <View style={{ ...styles.wrapper, ...wraperStyle }}>
                <Headline>{headlineText}</Headline>
                <View style={styles.inputContainer}>
                    <Input placeholder={placeHolder ? placeHolder : "....."} value={textValue} onChangeText={(txt) => handleOnChangeText(txt)} />
                </View>
                <View style={{ ...styles.btnContainer, ...btnContainerStyle }}>
                    {
                        confrimButtonAction &&
                        <Button
                            style={{ ...styles.btn, ...btnStyle }}
                            uppercase={false}
                            color={confirmButtonColor ? confirmButtonColor : "#187bcd"}
                            mode="contained"
                            onPress={confrimButtonAction}
                        >
                            {confirmButtonTitle ? confirmButtonTitle : "Confirm"}
                        </Button>
                    }
                    {
                        declineButtonAction &&
                        <Button
                            style={{ ...styles.btn, ...btnStyle }}
                            uppercase={false}
                            color={declineButtonColor ? declineButtonColor : "#c1c1c1"}
                            mode="contained"
                            onPress={declineButtonAction}
                        >
                            {declineButtonTitle ? declineButtonTitle : "Decline"}

                        </Button>
                    }
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eaeaea",
        padding: 10
    },
    wrapper: {
        width: "90%",
        alignSelf: "center",
        alignItems: "center"
    },
    inputContainer: {
        width: "100%",
        marginVertical: 10
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    btn: {
        width: "49%"
    }
});
export default TopArea;