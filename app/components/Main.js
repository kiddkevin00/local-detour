import Dashboard from './Dashboard';
import BaseComponent from './common/BaseComponent';
import { firebaseAuth, firebaseGoogleAuthProvider } from '../proxies/FirebaseProxy';
import GithubProxy from '../proxies/GithubProxy';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import React from 'react';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
  },
  searchButton: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  searchButtonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
  },
  signupButton: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'orange',
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  signupButtonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
});

class Main extends BaseComponent {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      isLoading: false,
      error: '',
    };
    this._bind('_handleChange', '_handleSearch', '_handleSignup');
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.title }>Search for a GitHub user</Text>
        <TextInput
          style={ styles.searchInput }
          value={ this.state.username }
          onChange={ this._handleChange }
        />
        <TouchableHighlight
          style={ styles.searchButton }
          onPress={ this._handleSearch }
          underlayColor="#f2f2f2"
        >
          <Text style={ styles.searchButtonText }>SEARCH</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={ styles.signupButton }
          onPress={ this._handleSignup }
          underlayColor="#f2f2f2"
        >
          <Text style={ styles.signupButtonText }>Sign Up</Text>
        </TouchableHighlight>
        <ActivityIndicator
          animating={ this.state.isLoading }
          color="#111"
          size="large"
        />
        <Text>{ this.state.error }</Text>
      </View>
    );
  }

  _handleChange(event) {
    this.setState({
      username: event.nativeEvent.text,
    });
  }

  _handleSearch() {
    this.setState({
      isLoading: true,
    });

    GithubProxy.getBio(this.state.username)
      .then((payload) => {
        if (payload.message === 'Not Found') {
          this.setState({
            isLoading: false,
            error: 'User not found.',
          });
        } else {
          this.props.navigator.push({
            title: payload.name || payload.login || 'Dashboard',
            component: Dashboard,
            passProps: { userInfo: payload },
          });

          this.setState({
            username: '',
            isLoading: false,
            error: '',
          });
        }
      });
  }

  _handleSignup() {
    // TODO
    firebaseAuth.signInAnonymously()
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/operation-not-allowed') {
          alert('You must enable Anonymous auth in the Firebase Console.');
          console.log(error);
        } else {
          console.error(errorMessage, error);
        }
      });
  }

}

export default Main;
