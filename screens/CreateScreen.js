import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Text, Card, Title } from "react-native-paper";
import axios from "axios";
import Input from "../components/Input";
import Drop from "../components/Drop";
import Header from "../components/Header";

function CreateScreen({ route, navigation }) {
  const { AdImage } = route.params ?? "";
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0.00");
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);

  async function uploadImage() {
    if (!AdImage) {
      return "placeholder.jpg";
    }

    let fileType = AdImage.substring(AdImage.lastIndexOf(".") + 1);
    const picName = Math.random().toString(36).slice(2);

    let formData = new FormData();
    formData.append("uploaded_file", {
      uri: AdImage,
      name: `${picName}.${fileType}`,
      type: `image/${fileType}`,
    });

    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await fetch(global.IMAGE_URL + "/mobile/imageupload.php", options);
    const imageName = await response.text();
    return imageName;
  }

  async function createListing() {
    if(title && platform && genre && description && price)
    {
      const listing = {
        Title: title,
        Description: description,
        Price: price,
        Platform: platform,
        Genre: genre,
        Borough: global.Borough,
        Image: await uploadImage(),
        UserID: global.ID,
      };
  
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(listing),
      };
  
      const response = await fetch(
        global.API_URL + "/api/listings/new",
        requestOptions
      );
      const respData = await response.json();
  
      if (respData.insertID) {
        console.log(respData);
        navigation.navigate("Listings");
      }
    }
    else
    {
      alert("All fields except the image are required!")
    }
  }

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

  return (
    <ScrollView style={styles.container}>

      <Header value="NEW LISTING" />
      <Input inputvalue={setTitle} value={title} label="Title" />

      <Drop value={platform} setValue={setPlatform} list={platforms} label="Platform" />
      <Drop value={genre} setValue={setGenre} list={genres} label="Genre" />

      <Input inputvalue={setDescription} value={description} multi={true} label="Description" />
      <Input inputvalue={setPrice} value={price} label="Price £ (ex 12.00)" />

      <Card style={{ margin: 10 }}>
        <Card.Content>
          <Title>Image</Title>
        </Card.Content>
        <Card.Cover source={{ uri: AdImage ?? global.IMAGE_URL + "/mobile/uploads/placeholder.jpg" }} />
        <Card.Actions><Button onPress={() => { navigation.navigate("Camera", { Screen: 'Create' }); }}>Capture Image</Button></Card.Actions>
      </Card>

      <Button mode="contained" icon="login" onPress={() => { createListing(); }} style={{ margin: 20 }} labelStyle={{ fontSize: 25 }}>Create</Button>

      <Text />

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  }
});
export default CreateScreen;
