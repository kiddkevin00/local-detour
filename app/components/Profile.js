import Badge from './common/Badge';
import Separator from './common/Separator';
import BaseComponent from './common/BaseComponent';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';


const styles = StyleSheet.create({
  container: {
    flex: 1,
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

class Profile extends BaseComponent {

  constructor(props) {
    super(props);

    this.state = {};
  }

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

  static _formatTitle(title) {
    return title && `${title[0].toUpperCase()}${title.slice(1).replace('_', ' ')}`;
  }

}
Profile.propTypes = {
  userInfo: React.PropTypes.object.isRequired,
};

export default Profile;
