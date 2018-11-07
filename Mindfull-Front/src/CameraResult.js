import React, { Component } from 'react';
import { 
  StyleSheet,
  View,
  ScrollView,
  Button,
  Image,
  Text
} from 'react-native';
import { CheckBox } from 'react-native-elements'


class LogoTitle extends React.Component {
  render() {
    return (
      <View style={styles.logoTitle}>
      <Image
        source={require('../images/icon.png')}
        style={{ width: 30, height: 30 }}
      />
      <Text style={{color: 'white', fontSize: 24, marginLeft: 10, fontWeight: 'bold'}}>Results</Text>
      </View>
    );
  }
}



class CameraResult extends Component {
  static navigationOptions = {
    headerBackground: (
      <Image
        source={require('../images/header.jpg')}
        style={{height: 70}}
      />
    ),
    headerTintColor: 'white',
    headerTitle: (
      <LogoTitle />
    ),
  };

  constructor (){
    super();
    this.state = {
      list:[],
      selected: [],
    };
    this.selected = this.selected.bind(this)
  }
  
  componentDidMount = () => {  
    
    let list = this.state.list
    this.props.navigation.state.params.predictions.map(li => {
      if (li.value >= 0.90) {
        newPrediction = {
            id: li.id,
            name: li.name,
            value: li.value,
            checked: false,
          }
        list.push(newPrediction)
        this.setState({list})
      }
    })
  }

  selected(item){
    const list = this.state.list.map(li =>{
      if (li.id === item.id) {
        return {
          ...li,
          checked: li.checked === false ? true : false,
        }
      }
      return li
    })
    this.setState({list});
    let selected = this.state.selected
    this.state.list.map(li => {
      if (li.id === item.id) {
        if(li.checked === false) {
          selected.push(li.name)
          this.setState({selected})
        } else {
          selected.map((s, i) => {
            if(s === li.name) {
              selected.splice(i, 1);
              this.setState({selected})
            }
          })
        }
      }
    })
  }

  render() {
    return (
      <ScrollView contentContainerstyle={styles.container}>
        {this.state.list.map(item => {
          return(
            <View
              style={{
                flex: 1,
                alignSelf: 'flex-start',
                alignItems: 'center',
              }}>
            <CheckBox
              center
              title={item.name}
              checked={item.checked}
              onPress={this.selected.bind(null, item)}/>
            </View>
          )
        })}
        <Button 
          raised
          color='black'
          title="Add to Ingredients"
          buttonStyle={{backgroundColor: 'rgb(250,188,87)', borderRadius: 10, padding: 10, marginBottom: 20, width: 300}}
          textStyle={{textAlign: 'center', fontFamily: 'HelveticaNeue-Medium'}}
          onPress={() => this.props.navigation.navigate('Search',{onNavigateBack: this.props.navigation.state.params.onNavigateBack(this.state.selected)})}
        />
      </ScrollView>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CameraResult;