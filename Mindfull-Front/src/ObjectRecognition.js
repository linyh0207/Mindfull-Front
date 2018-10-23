import React from 'react';
import { Text, View, TouchableOpacity, FlatList} from 'react-native';
import { Camera, Permissions, ImageManipulator } from 'expo';

const Clarifai = require('clarifai');

const clarifai = new Clarifai.App({
  apiKey: '23c180a964a9418db8660a5b6cbbe614',
});
process.nextTick = setImmediate;



class ObjectRecognition extends React.Component {
  state = {
    hasCameraPermission: null,
    predictions: [],
  };
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  capturePhoto = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      return photo.uri;
    }
  };
  resize = async photo => {
    let manipulatedImage = await ImageManipulator.manipulate(
      photo,
      [{ resize: { height: 300, width: 300 } }],
      { base64: true }
    );
    return manipulatedImage.base64;
  };
  predict = async image => {
    let predictions = await clarifai.models.predict(
      Clarifai.FOOD_MODEL,
      image
    );
    return predictions;
  };
  objectDetection = async () => {
    let photo = await this.capturePhoto();
    let resized = await this.resize(photo);
    let predictions = await this.predict(resized);
    let concepts = predictions.outputs[0].data.concepts

    concepts.forEach(function(element) {
      if (element.value >= 0.95){
        console.log(element.name);
      } 
    });

    this.setState({ predictions: predictions.outputs[0].data.concepts });
  };


  render() {
    const { hasCameraPermission, predictions } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ flex: 1 }}
            type={this.state.type}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignSelf: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <FlatList
                  data={predictions.map(prediction => ({
                    key: `${prediction.name} ${prediction.value}`,
                  }))}
                  renderItem={({ item }) => (
                    <Text style={{ paddingLeft: 15, color: 'white', fontSize: 20 }}>{item.key}</Text>
                  )}
                />
              </View>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignItems: 'center',
                  backgroundColor: 'blue',
                  height: '10%',
                }}
                onPress={this.objectDetection}
              >
                <Text style={{ fontSize: 30, color: 'white', padding: 15 }}>
                  {' '}
                  Detect Objects{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
        
      );
    }
  }
}



export default ObjectRecognition;