import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, Image } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';

class LogoTitle extends React.Component {
  render() {
    return (
      <View style={styles.logoTitle}>
      <Image
        source={require('../images/icon.png')}
        style={{ width: 30, height: 30 }}
      />
      <Text style={{color: 'white', fontSize: 24, marginLeft: 10, fontWeight: 'bold'}}>Barcode Scanner</Text>
      </View>
    );
  }
}

export default class BarcodeScanner extends Component {
  static navigationOptions = {
    
    
    headerTintColor: 'white',

    headerTitle: (
      <LogoTitle />
      
    ),
  };
  state = {
    hasCameraPermission: null
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = data => {

    console.log(data.data)
    if(data.data === '0062107302753'){
     console.log('matched')
     Alert.alert(
      'Emergenc',
      JSON.stringify(data)
    )
    } else {
      console.log('not matched')
      Alert.alert(
        'Not Emergenc',
        JSON.stringify(data)
      )
    };
    // Alert.alert(
    //     'Scan successful!',
    //     JSON.stringify(data)
    //   )
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ?
          <Text>Requesting for camera permission</Text> :
          this.state.hasCameraPermission === false ?
            <Text>Camera permission is not granted</Text> :
            <BarCodeScanner
              torchMode="on"
              onBarCodeRead={this._handleBarCodeRead}
              style={{ height: 300, width: 300 }}
            />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  logoTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});