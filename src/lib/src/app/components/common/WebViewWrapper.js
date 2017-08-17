import {
  WebView,
  View,
  Dimensions,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Item,
  Input,
  Button,
  Text,
  Icon,
} from 'native-base';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


class WebViewWrapper extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  _backToComponent = () => {
    this.props.navigator.pop();
  }

  render() {
    const { width, height } = Dimensions.get('window');

    return (
      <Container>
        <Header style={ { backgroundColor: '#f96332' } } searchBar rounded>
          <Left>
            <Button transparent onPress={ this._backToComponent }>
              <Icon style={ { color: 'white' } } name="arrow-back" />
            </Button>
          </Left>
          <Item style={ { flexGrow: 2, backgroundColor: 'white' } }>
            <Icon name="ios-search" />
            <Input />
          </Item>
          <Right>
            <Button transparent>
              <Text style={ { color: 'white' } }>Search</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={ { width, height } }>
            <WebView source={ { uri: this.props.url } } />
          </View>
        </Content>
      </Container>
    );
  }
}

export { WebViewWrapper as default };
