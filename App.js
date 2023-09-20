import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

import { Camera } from 'expo-camera'

import { FontAwesome } from '@expo/vector-icons'

export default function App() {

  const camRef = useRef(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [hasPermission, setHasPermission] = useState(null)
  const [capturedPhoto, setCapturedPhoto] = useState(null)

  useEffect (() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync(); //request permissions
      setHasPermission(status === "granted")
    })();
  }, [])

  if (hasPermission === null) {
    return <View />
  }

  if (hasPermission === false) {
    return <Text>Acesso Negado</Text>
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync()
      setCapturedPhoto(data.uri)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
      style={styles.camera}
      type={type}
      >
      <View style={styles.contentButtons}>
        <TouchableOpacity
          style={styles.buttonFlip}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
            )

          }}
        >
          <FontAwesome name="exchange" size={23} color="red"></FontAwesome>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.buttonCamera}
        onPress={takePicture}
        >
          <FontAwesome name="camera" size={23} color="#fff"></FontAwesome>
        </TouchableOpacity>
      </View>

      </Camera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  contentButtons: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  buttonFlip: {
    position: "absolute",
    bottom: 50,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#fff",
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  buttonCamera: {
    position: "absolute",
    bottom: 50,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"red",
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});
