import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Button
} from 'react-native';
import { CheckBox } from 'react-native-elements'


class CameraResult extends Component {
  static navigationOptions = {
    title: 'Result',
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
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
     
      if (li.value > 0.95) {
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
    console.log(this.state.selected)
  }



  render() {
    console.log("this.props.navigation.state.params.onNavigateBack() AT camera result",this.props.navigation.state.params.onNavigateBack)

    
    return (
      <ScrollView contentContainerstyle={styles.container}>
      {this.state.list.map(item => {
        return(
          <View
          style={{
            flex: 1,
            alignSelf: 'flex-start',
            alignItems: 'center',
          }}
        >
              <CheckBox
                center
                title={item.name}
                checked={item.checked}
                onPress={this.selected.bind(null, item)}
              />
            )}
          />
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
          {/* onPress={() => this.props.navigation.navigate('Search', {onNavigateBack: this.props.navigation.state.params.onNavigateBack(this.state.selected)})} */}

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
});


export default CameraResult;