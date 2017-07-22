import Events from './Events';
import Login from './Login';
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
  signupButton: {
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
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'orange',
    height: 45,
    backgroundColor: 'orange',
  },
  signupLaterButton: {
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'white',
    height: 45,
    backgroundColor: 'transparent',
  },
  footerText: {
    fontSize: 14,
    color: '#a3a7b2',
  },
  loginButtonText: {
    fontSize: 18,
    color: 'white',
  },
  signupButtonText: {
    fontSize: 18,
    color: '#111',
  },
  signupLaterButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

class Signup extends Component {

  state = {
    formFullName: '',
    formEmail: '',
    formPassword: '',
    isLoading: false,
    error: '',
  };

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.main }>
          <Text style={ styles.title }>NYCorner</Text>
          <TextInput
            style={ styles.formInput }
            value={ this.state.formFullName }
            onChange={ this._handleChange.bind(this, 'FullName') }
            placeholder="Full Name"
            placeholderTextColor="#a3a7b2"
          />
          <TextInput
            style={ styles.formInput }
            value={ this.state.formEmail }
            onChange={ this._handleChange.bind(this, 'Email') }
            placeholder="Email Address"
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
            style={ styles.signupButton }
            onPress={ this._handleSignup }
            underlayColor="#f2f2f2"
          >
            <Text style={ styles.signupButtonText }>SIGN UP</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={ styles.loginButton }
            onPress={ this._gotoLogin }
            underlayColor="#ffcc00"
          >
            <Text style={ styles.loginButtonText }>LOGIN</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={ styles.signupLaterButton }
            onPress={ this._signinAnonymously }
            underlayColor="#ffcc00"
          >
            <Text style={ styles.signupLaterButtonText }>SIGN UP LATER</Text>
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

  _handleSignup = async () => {
    this.setState({
      isLoading: true,
    });

    try {
      const userInfo = await firebaseAuth.createUserWithEmailAndPassword(this.state.formEmail,
        this.state.formPassword);

      userInfo.sendEmailVerification();

      this.props.navigator.push({
        title: 'All Events',
        component: Events,
        passProps: { userInfo },
      });

      this.setState({
        formFullName: '',
        formEmail: '',
        formPassword: '',
        isLoading: false,
        error: '',
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/weak-password') {
        global.alert('The password is too weak.');
      } else if (errorCode === 'auth/email-already-in-use') {
        global.alert('The email is already in use.');
      } else if (errorCode === 'auth/invalid-email') {
        global.alert('The email is invalid.');
      } else if (errorCode === 'auth/operation-not-allowed') {
        global.alert('You must enable Email/Password auth in the Firebase Console.');
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

  _gotoLogin = () => {
    this.props.navigator.push({
      title: 'Log In',
      component: Login,
    });
  }

  _signinAnonymously = async () => {
    this.setState({
      isLoading: true,
    });

    try {
      const userInfo = await firebaseAuth.signInAnonymously();

      this.props.navigator.push({
        title: 'All Events',
        component: Events,
        passProps: { userInfo },
      });

      this.setState({
        formFullName: '',
        formEmail: '',
        formPassword: '',
        isLoading: false,
        error: '',
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/operation-not-allowed') {
        global.alert('You must enable Anonymous auth in the Firebase Console.');
      } else {
        global.alert(errorMessage);
      }

      this.setState({
        isLoading: false,
        error: errorMessage,
      });
    }
  }

}

export { Signup as default };
