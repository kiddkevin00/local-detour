import Events from './Events';
import Signup from './Signup';
import { firebaseAuth } from '../proxies/FirebaseProxy';
import {
  ActivityIndicator,
  TouchableHighlight,
  TextInput,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f7f9',
  },
  main: {
    flexGrow: 70,
    marginTop: 64,
    padding: 30,
    backgroundColor: '#23cfb9',
  },
  footer: {
    flexGrow: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    alignSelf: 'center',
    marginBottom: 20,
    fontSize: 25,
    color: '#F5F5F5',
  },
  formInput: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'white',
    padding: 4,
    height: 50,
    fontSize: 23,
    color: 'white',
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'white',
    height: 45,
    backgroundColor: 'white',
  },
  signupButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'orange',
    height: 45,
    backgroundColor: 'orange',
  },
  footerText: {
    fontSize: 14,
    color: '#a3a7b2',
  },
  loginButtonText: {
    fontSize: 18,
    color: '#111',
  },
  signupButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

class Login extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  state = {
    formEmail: '',
    formPassword: '',
    isLoading: false,
    error: '',
  };

  _handleLogin = async () => {
    this.setState({
      isLoading: true,
    });

    try {
      const userInfo = await firebaseAuth
        .signInWithEmailAndPassword(this.state.formEmail, this.state.formPassword);

      this.props.navigator.push({
        title: 'Events List',
        component: Events,
        passProps: { userInfo },
      });

      this.setState({
        formEmail: '',
        formPassword: '',
        isLoading: false,
        error: '',
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/wrong-password') {
        global.alert('Wrong password.');
      } else {
        global.alert(errorMessage);
      }

      this.setState({
        isLoading: false,
        error: errorMessage,
      });
    }
  }

  _handleChange = (field, event) => {
    this.setState({
      [`form${field}`]: event.nativeEvent.text,
    });
  }

  _gotoSignup = () => {
    this.props.navigator.push({
      title: 'Sign Up',
      component: Signup,
    });
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.main }>
          <Text style={ styles.title }>NYCorner</Text>
          <TextInput
            style={ styles.formInput }
            value={ this.state.formEmail }
            onChange={ this._handleChange.bind(this, 'Email') }
            placeholder="Email"
            placeholderTextColor="#a3a7b2"
          />
          <TextInput
            style={ styles.formInput }
            value={ this.state.formPassword }
            onChange={ this._handleChange.bind(this, 'Password') }
            placeholder="Password"
            placeholderTextColor="#a3a7b2"
            secureTextEntry={ true }
          />
          <TouchableHighlight
            style={ styles.loginButton }
            onPress={ this._handleLogin }
            underlayColor="#f2f2f2"
          >
            <Text style={ styles.loginButtonText }>LOG IN</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={ styles.signupButton }
            onPress={ this._gotoSignup }
            underlayColor="#ffcc00"
          >
            <Text style={ styles.signupButtonText }>SIGN UP</Text>
          </TouchableHighlight>
          <ActivityIndicator
            animating={ this.state.isLoading }
            color="#111"
            size="large"
          />
          <Text>{ this.state.error }</Text>
        </View>
        <View style={ styles.footer }>
          <Text style={ styles.footerText }>
            By signing in, you agree to our Terms & Privacy Policy
          </Text>
        </View>
      </View>
    );
  }

}

export { Login as default };
