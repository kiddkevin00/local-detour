import BaseComponent from './BaseComponent';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, ActivityIndicatorIOS } from 'react-native';


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

class Main extends BaseComponent {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      isLoading: false,
      error: false,
    };
    this._bind('_handleChange', '_handleSubmit');
  }

  render() {
    return (
      <View style={ styles.mainContainer }>
        <Text style={ styles.title }>Search for a Github user</Text>
        <TextInput
          style={ styles.searchInput }
          value={ this.state.username }
          onChange={ this._handleChange }
        />
        <TouchableHighlight
          style={ styles.button }
          onPress={ this._handleSubmit }
          underlayColor="white"
        >
          <Text style={ styles.buttonText }>SEARCH</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _handleChange(event) {
    console.log(event.nativeEvent.text)
    this.setState({
      username: event.nativeEvent.text,
    })
  }

  _handleSubmit() {
    this.setState({
      loading: true,
    });
    console.log(this.state.username)
  }

}

export default Main;
