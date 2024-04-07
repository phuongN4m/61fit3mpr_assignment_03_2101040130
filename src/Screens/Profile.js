import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Image,
    SafeAreaView,
    Button,
    Alert,
    Platform,
    StatusBar,
    ScrollAreaView,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Profile({ navigation }) {
    return (
        <View style={styles.container}>

            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.profile}
            >

                {/* <Image source={require(`../assets/left-arrow.png`)} style={styles.image}></Image> */}
                <Icon name="user" size={60} color="#7f3dff" />
            </TouchableOpacity>
            <View style={styles.username}>
                <Text style={styles.subtitle}>Username</Text>
                {/* <Text style={styles.title}>{user.uid}</Text> */}
                <Text style={styles.title}>TranNam</Text>
            </View>
            <View style={styles.optionCont}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()} style={styles.optionSubCont}
                >
                    <Icon name="book" size={40} color="#7f3dff" /><Text style={styles.optionTitle}>Account</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.goBack()} style={styles.optionSubCont}
                >
                    <Icon name="gear" size={40} color="#7f3dff" /><Text style={styles.optionTitle}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.goBack()} style={styles.optionSubCont}
                >
                    <Icon name="address-book" size={40} color="#7f3dff" /><Text style={styles.optionTitle}>Contacts</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.goBack()} style={styles.optionSubCont}
                >
                    <Icon name="sign-out" size={40} color="#7f3dff" /><Text style={{ ...styles.optionTitle, borderBottomWidth: 0, }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        // flex: 1,
        width: "100%",
        height: "100%",
    },

    container: {
        flex: 1,
        height: 70,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        marginHorizontal: 20,
        backgroundColor: "#f1f1f1",
    },
    subtitle: {
        color: "#b1b1bb",
        fontSize: 25,
    },
    title: {
        color: "#17181a",
        fontSize: 35,
        fontWeight: 'bold',
    },
    optionTitle: {
        color: "#595b5d",
        fontSize: 20,
        paddingVertical: 30,
        paddingHorizontal: 20,
        // borderRadius: 20,
        // marginVertical: 5,
    },
    optionCont: {
        borderRadius: 30,
        backgroundColor: "white",
    },
    optionSubCont: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
        borderBottomWidth: 3,
        borderColor: "#f1f1f1",
    },
    profile: {
        // backgroundColor: "white",
        // borderWidth: 1,
        borderColor: "#7F3DFF",
        width: 100,
        height: 100,
        borderRadius: 100,
        position: "absolute",
        top: 50,
        left: 40,
        // borderColor: "black",
        borderWidth: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    username: {
        marginTop: 15,
        marginLeft: 150,
        marginBottom: 100,
    },
});
