import Badge from './common/__Badge__';
import Separator from './common/Separator';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  rowContainer: {
    padding: 10,
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16,
  },
  rowContent: {
    fontSize: 19,
  },
});

class Profile extends Component {

  static propTypes = {
    userInfo: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  static _formatTitle(title) {
    return title && `${title[0].toUpperCase()}${title.slice(1).replace('_', ' ')}`;
  }

  state = {};

  render() {
    const userInfo = this.props.userInfo;
    const shownTopics = ['company', 'location', 'followers', 'following', 'email', 'bio', 'public_repos'];
    const list = shownTopics.map((item) => (
      userInfo[item] ? (
        <View key={ item }>
          <View style={ styles.rowContainer }>
            <Text style={ styles.rowTitle }>{ Profile._formatTitle(item) }</Text>
            <Text style={ styles.rowContent }>{ userInfo[item] }</Text>
          </View>
          <Separator />
        </View>
      ) : (
        <View key={ item } />
      )
    ));

    return (
      <ScrollView style={ styles.container }>
        <Badge
          avatarUrl={ userInfo.avatar_url }
          name={ userInfo.name }
          login={ userInfo.login }
        />
        { list }
      </ScrollView>
    );
  }

}

export { Profile as default };
