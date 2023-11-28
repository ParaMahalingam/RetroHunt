import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { Provider as PaperProvider } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';


import HomeScreen from "./screens/HomeScreen";
import MyListingsScreen from "./screens/MyListingsScreen";
import CreateScreen from "./screens/CreateScreen";
import CameraScreen from "./screens/CameraScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { useState, useEffect } from "react";
import ViewListingScreen from "./screens/ViewListingScreen";
import ChatScreen from "./screens/ChatScreen";
import EditScreen from "./screens/EditScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

//Global variable
//I am hosting the backend API on a remote server due to university restriction on MYSQL connection
//If you wish to run the backend server on your local PC, make sure you are not connected to Eduroam wifi. Once connected to a different wifi start the backend server and then replace the API URL e.g "192.168.1.75:3020"
// global.API_URL = "http://192.168.1.78:3020";
global.API_URL = "x";
global.IMAGE_URL = "x";


function HomeTabs() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="All Listings" component={HomeScreen} />
      <Stack.Screen name="View Listing" component={ViewListingScreen} />
    </Stack.Navigator>
  );
}

function ListingTabs() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Listings" component={MyListingsScreen} />
      <Stack.Screen name="Edit Listing" component={EditScreen} />
      <Stack.Screen name="New Listing" component={CreateScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [loggedIn, setloggedIn] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(async () => {
    const appData = await AsyncStorage.getItem("loggedIn");
    if (appData == null) {
      setloggedIn(false)
      setisLoading(false)
    } else {
      //Store the user data as a global variable
      global.ID = await AsyncStorage.getItem('ID')
      global.Name = await AsyncStorage.getItem('Name')
      global.Username = await AsyncStorage.getItem('Username')
      global.Borough = await AsyncStorage.getItem('Borough')

      setloggedIn(true)
      setisLoading(false)
    }
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>


        {isLoading ? (
          <></>
        ) : loggedIn ? (
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={HomeTabs}
              options={{
                headerShown: false,
                tabBarIcon: () => (
                  <MaterialIcons name="home" color="#6200ee" size={30} />
                ),
              }}
            />
            <Tab.Screen
              name="Chat"
              component={ChatScreen}
              options={{
                headerShown: true,
                tabBarIcon: () => (
                  <MaterialIcons name="chat" color="#6200ee" size={30} />
                ),
              }}
            />
            <Tab.Screen
              name="My Listings"
              component={ListingTabs}
              options={{
                headerShown: false,
                tabBarIcon: () => (
                  <MaterialIcons name="view-list" color="#6200ee" size={30} />
                ),
              }}
            />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
