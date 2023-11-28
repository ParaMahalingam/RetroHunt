import React, { useState, useLayoutEffect, useCallback, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Platform } from 'react-native';
import { Button, Card, Searchbar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import Drop from "../components/Drop";

function HomeScreen({ route, navigation }) {
  const [Listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [platform, setPlatform] = useState('');
  const [genre, setGenre] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);

  async function fetchListings() {
    try {
      const response = await axios.get(global.API_URL + "/api/search", { params: { keyword: searchQuery, platform: platform, genre: genre } })
      var r = response.data.result;
      setListings(r)
    } catch (error) {
      console.error(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchListings();
    }, [searchQuery, platform, genre])
  );

  async function fetchPlatforms() {
    try {
      const response = await axios.get(global.API_URL + "/api/platforms");
      var r = response.data.result;
      setPlatforms(r);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchGenres() {
    try {
      const response = await axios.get(global.API_URL + "/api/genres");
      var r = response.data.result;
      setGenres(r);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPlatforms();
    fetchGenres();
  }, []);


  async function reloadapp() {
    AsyncStorage.removeItem('ID');
    AsyncStorage.removeItem('Name');
    AsyncStorage.removeItem('Username');
    AsyncStorage.removeItem('Borough');
    AsyncStorage.removeItem('loggedIn');
    if (Platform.OS === 'web') {
      window.location.reload();
    }
    else {
      await Updates.reloadAsync();
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({ headerRight: () => (<Button onPress={() => { reloadapp() }}>Logout</Button>) });
  }, [navigation]);


  return (
    <ScrollView style={{ padding: 10 }}>
      <Searchbar style={{ margin: 4 }} placeholder="Search" onChangeText={(query) => { setSearchQuery(query) }} value={searchQuery} />

      <View style={styles.searchWidget}>

        <View style={styles.item}><Drop value={platform} setValue={setPlatform} list={platforms} label="Platform" noMargin={true} /></View>
        <View style={styles.item}><Drop value={genre} setValue={setGenre} list={genres} label="Genre" noMargin={true} /></View>

      </View>

      <View style={styles.container}>

        {Listings.map((s) => (
          <View key={s.ID} style={styles.item}>
            <Card mode='outlined'>
              <Card.Title title={s.Title} subtitle={"£" + s.Price.toFixed(2) + " | " + s.Platform} />
              <Card.Cover style={{ height: undefined, aspectRatio: 1 }} source={{ uri: global.IMAGE_URL + "/mobile/uploads/" + s.Image }} />
              <Card.Actions style={{ justifyContent: 'center' }}>
                <Button onPress={() => { navigation.navigate('View Listing', { Listing: s }) }}>View</Button>
              </Card.Actions>
            </Card>
          </View>
        ))}
      </View>
    </ScrollView>
  );


};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  item: {
    width: '50%',
    padding: 3,
  },
  searchWidget: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
})
export default HomeScreen;