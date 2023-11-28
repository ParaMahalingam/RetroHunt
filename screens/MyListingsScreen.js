import React, { useState, useLayoutEffect, useCallback } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Button, Card } from "react-native-paper";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../components/Header";

function MyListingsScreen({ route, navigation }) {
    const [userListings, setUserListings] = useState([]);

    async function fetchUserListings() {
        try {
            const response = await axios.get(
                global.API_URL + "/api/listings/user/" + global.ID
            );
            var r = response.data.result;
            setUserListings(r);
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteListing(id) {
        try {
            const res = await axios.get(
                global.API_URL + "/api/listings/delete/" + id
            );
            var response = res.data;
            if (response.affectedRow) {
                fetchUserListings();
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function soldStatus(ListingID, Sold) {
        try {
            const res = await axios.get(global.API_URL + "/api/listings/sold", {
                params: { ListingID: ListingID, Sold: Sold },
            });
            var response = res.data;
            if (response.affectedRow) {
                fetchUserListings();
            }
        } catch (error) {
            console.error(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchUserListings();
        }, [])
    );

    useLayoutEffect(() => {
        navigation.setOptions({ headerRight: () => (<Button onPress={() => { navigation.navigate("New Listing"); }}>+ New</Button>) });
    }, [navigation]);

    return (
        <ScrollView style={styles.container}>
            <Header value="MY LISTINGS" />

            <View style={styles.cardContainer}>
                {userListings.map((s) => (
                    <View key={s.ID} style={styles.item}>
                        <Card mode="outlined">
                            <Card.Title title={s.Title} subtitle={"£" + s.Price + " | " + s.Platform} />
                            <Button style={{ borderRadius: 0 }} mode="contained" color={s.Sold ? "#73B66B" : "#ff5c5c"} onPress={() => { { s.Sold ? soldStatus(s.ID, 0) : soldStatus(s.ID, 1); } }}>{s.Sold ? "Sold" : "Not Sold"}</Button>
                            <Card.Cover style={{ height: undefined, aspectRatio: 1 }} source={{ uri: global.IMAGE_URL + "/mobile/uploads/" + s.Image, }} />
                            <Card.Actions style={{ justifyContent: "center" }}>
                                <Button
                                    onPress={() => {
                                        navigation.navigate("Edit Listing", {
                                            ID: s.ID.toString(),
                                            Title: s.Title,
                                            Description: s.Description,
                                            Price: s.Price.toString(),
                                            Platform: s.Platform,
                                            Genre: s.Genre,
                                            AdImage: global.IMAGE_URL + "/mobile/uploads/" + s.Image,
                                        });
                                    }}
                                >Edit</Button>
                                <Button onPress={() => { deleteListing(s.ID); }}>Delete</Button>
                            </Card.Actions>
                        </Card>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    cardContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
    },
    item: {
        width: "50%",
        padding: 3,
    },
});
export default MyListingsScreen;
