import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import Header from "../components/Header";
function ViewListingScreen({ route, navigation }) {
    const { Listing } = route.params ?? '';

    return (
        <ScrollView style={styles.container}>
            <Header value={Listing.Title} />
            <Card>
                <Title style={{ alignSelf: 'center', padding: 10 }}>{"Price: £" + Listing.Price.toFixed(2) + " | Platform: " + Listing.Platform}</Title>
                <Card.Cover source={{ uri: global.IMAGE_URL + "/mobile/uploads/" + Listing.Image }} />
                <Card.Content>
                    <Title>Description:</Title>
                    <Paragraph style={{ fontSize: 17 }}>{Listing.Description}</Paragraph>
                </Card.Content>
                <Card.Actions style={{ justifyContent: 'center', margin: 10 }}>
                    <Button mode="contained" onPress={() => { navigation.navigate('Chat', { room: Listing.UserID.toString() }) }}>CONTACT SELLER</Button>
                </Card.Actions>
            </Card>

        </ScrollView>
    );

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
})
export default ViewListingScreen;