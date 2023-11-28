import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Camera } from 'expo-camera';
import { manipulateAsync } from 'expo-image-manipulator';

function CameraScreen({ route, navigation }) {
    const [cameraPermission, setCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setCameraPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null);

            const resizedPhoto = await manipulateAsync(
                data.uri,
                [{ resize: { width: 500, height: 500 } }],
                { compress: 1, format: "jpeg", base64: false }
            );

            console.log(data.uri);
            if (route.params.Screen === 'Create') {
                navigation.navigate('New Listing', { AdImage: resizedPhoto.uri });
            }
            else {
                navigation.navigate('Edit Listing', { AdImage: resizedPhoto.uri });
            }
        }
    };

    if (cameraPermission === null) {
        return <View />;
    }
    if (cameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <ScrollView>
            <View style={styles.cameraContainer}>
                <Camera
                    ref={(ref) => setCamera(ref)}
                    style={styles.fixedRatio}
                    type={Camera.Constants.Type.back}
                    ratio={'1:1'}
                />
            </View>

            <Button mode="contained" icon="login" onPress={takePicture} style={{ margin: 20 }} labelStyle={{ fontSize: 25 }}>Take pic</Button>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        margin: 10,
        flexDirection: 'row'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    }
})
export default CameraScreen;