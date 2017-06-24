import Badge from './common/Badge';
import WebViewWrapper from './common/WebViewWrapper';
import Separator from './common/Separator';
import BaseComponent from './common/BaseComponent';
import GithubProxy from '../proxies/GithubProxy';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import React from 'react';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  },
});

class Repositories extends BaseComponent {

  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      error: '',
    };
    this._bind('_openPage');
  }

  componentDidMount() {
    GithubProxy.getRepos(this.props.userInfo.login)
      .then((repos) => {
        this.setState({
          repos,
          error: '',
        });
      })
      .catch((err) => {
        this.setState({ error: JSON.stringify(err, null, 2) });
      })
  }

  render() {
    const userInfo = this.props.userInfo;
    const list = this.state.repos.map((item, index) => (
      <View key={ `repo-${index}` }>
        <View style={ styles.rowContainer }>
          <TouchableHighlight
            onPress={ this._openPage.bind(this, item.html_url) }
            underlayColor="transparent"
          >
            <Text style={ styles.name }>{ item.name }</Text>
          </TouchableHighlight>
          <Text style={ styles.stars }>Stars: { item.stargazers_count }</Text>
          { item.description ? (
            <Text style={ styles.description }>{ item.description }</Text>
          ) : (
            <View />
          )}
        </View>
        <Separator />
      </View>
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

  _openPage(url) {
    this.props.navigator.push({
      title: 'Web Page',
      component: WebViewWrapper,
      passProps: { url },
    });
  }

}
Repositories.propTypes = {
  userInfo: React.PropTypes.object.isRequired,
};

export default Repositories;
