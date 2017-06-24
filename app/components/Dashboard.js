import Profile from './Profile';
import Repositories from './Repositories';
import Notes from './Notes';
import BaseComponent from './common/BaseComponent';
import GithubProxy from '../proxies/GithubProxy';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1,
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

class Dashboard extends BaseComponent {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      isLoading: false,
      error: '',
    };
    this._bind('_goToProfile', '_goToRepos', '_goToNotes', '_makeBackground');
  }

  render() {
    const buttonStyleBase = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1,
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

  _goToProfile() {
    this.props.navigator.push({
      title: 'Profile',
      component: Profile,
      passProps: { userInfo: this.props.userInfo },
    });
  }

  _goToRepos() {
    this.props.navigator.push({
      title: 'Repositories',
      component: Repositories,
      passProps: {
        userInfo: this.props.userInfo,
      },
    });
  }

  _goToNotes() {
    this.props.navigator.push({
      title: 'Notes',
      component: Notes,
      passProps: {
        userInfo: this.props.userInfo,
      },
    });
  }

  _makeBackground(btn) {
    const obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1,
    };

    if (btn === 0) {
      obj.backgroundColor = '#48BBEC';
    } else if (btn === 1) {
      obj.backgroundColor = '#E77AAE';
    } else {
      obj.backgroundColor = '#758BF4';
    }

    return obj;
  }

}
Dashboard.propTypes = {
  userInfo: PropTypes.object.isRequired,
};

export default Dashboard;
