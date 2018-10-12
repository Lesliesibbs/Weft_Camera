import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground,CameraRoll } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class App extends React.Component {
  state = {
     hasCameraPermission: null,
     type: Camera.Constants.Type.back,
   };

   async componentWillMount() {
     const { status } = await Permissions.askAsync(Permissions.CAMERA);
     this.setState({ hasCameraPermission: status === 'granted' });
   }

   takePicture = () => {
  this.camera.takePictureAsync({
    quality: 0.1,
    base64: true,
    exif: false
  }).then(photo => {
    CameraRoll.saveToCameraRoll(photo.uri)
  })
}

  render() {
    const { photo } = this.state;
    return (
      <View style={{ flex: 1, width: '100%' }}>
        <Camera
          style={{ flex: 1 }}
          onPress={this.takePicture}
          type={Camera.Constants.Type.back}
          ref={cam => this.camera = cam}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={this.takePicture}/>
        </Camera>
      )}
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
