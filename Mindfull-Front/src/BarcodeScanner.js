import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';

export default class BarcodeScanner extends Component {
  state = {
    hasCameraPermission: null,
    barcode: '',
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


  // handleBarCodeScanned = ({ data }) => {
  //   this.setState({ parsedData: data })
  //   if (this.state.parsedData) {
  //     this.props.navigation.pop()
  //     this.props.navigation.navigate('scannerResult', { data })
  //   } else {
  //     this.setState({ parsedData: data })
  //   }
  // }

  _handleBarCodeRead = data => {
    this.setState({
      barcode: data.data
    })
    console.log("this.state.barcode",this.state.barcode)
    if(data.data === '0062107302753'){
    //  console.log('matched')
     Alert.alert(
      'Emergenc',
      JSON.stringify(data)
    )
    } else {
      // console.log('not matched')
      Alert.alert(
        'Not Emergenc',
        JSON.stringify(data)
      )
    };


  //Barcode API

  //   let url = `https://api.upcitemdb.com/prod/trial/lookup?upc=${this.state.barcode}`

  //   fetch(`${url}`, {
  //     method: 'GET'
  //  })
  //  .then((response) => response.json())
  //  .then((responseJson) => {
  //    console.log(responseJson.items[0].title)
  //   //  this.setState({});
  //  })
  //  .catch((error) => {
  //     console.error(error);
  //  });
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
              style={{ height: 200, width: 200 }}
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
});