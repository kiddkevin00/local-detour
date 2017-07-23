import Profile from './__Profile__';
import Repositories from './__Repositories__';
import Notes from './__Notes__';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flexGrow: 1,
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center',
  },
});

class Dashboard extends Component {

  static propTypes = {
    userInfo: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  state = {
    username: '',
    isLoading: false,
    error: '',
  };

  _goToProfile = () => {
    this.props.navigator.push({
      title: 'Profile',
      component: Profile,
      passProps: { userInfo: this.props.userInfo },
    });
  }

  _goToRepos = () => {
    this.props.navigator.push({
      title: 'Repositories',
      component: Repositories,
      passProps: {
        userInfo: this.props.userInfo,
      },
    });
  }

  _goToNotes = () => {
    this.props.navigator.push({
      title: 'Notes',
      component: Notes,
      passProps: {
        userInfo: this.props.userInfo,
      },
    });
  }

  render() {
    const buttonStyleBase = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flexGrow: 1,
    };

    return (
      <View style={ styles.container }>
        <Image style={ styles.image } source={ { uri: this.props.userInfo.avatar_url } } />
        <TouchableHighlight
          style={ Object.assign({}, buttonStyleBase, { backgroundColor: '#48BBEC' }) }
          onPress={ this._goToProfile }
          underlayColor="#88D4F5"
        >
          <Text style={ styles.buttonText }>View Profile</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={ Object.assign({}, buttonStyleBase, { backgroundColor: '#E77AAE' }) }
          onPress={ this._goToRepos }
          underlayColor="#E39EBF"
        >
          <Text style={ styles.buttonText }>View Repos</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={ Object.assign({}, buttonStyleBase, { backgroundColor: '#758BF4' }) }
          onPress={ this._goToNotes }
          underlayColor="#9BAAF3"
        >
          <Text style={ styles.buttonText }>Take Notes</Text>
        </TouchableHighlight>
      </View>
    );
  }

}

export { Dashboard as default };
