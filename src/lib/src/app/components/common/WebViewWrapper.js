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
  Body,
  Right,
  Title,
  Button,
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
    const { height, width } = Dimensions.get('window');

    return (
      <Container>
        <Header style={ { backgroundColor: '#f96332' } }>
          <Left>
            <Button transparent onPress={ this._backToComponent }>
              <Icon style={ { color: 'white', fontSize: 32 } } name="arrow-back" />
            </Button>
          </Left>
          <Body style={ { flexGrow: 3 } }>
            <Title style={ { color: 'white', fontFamily: 'Lily Script One', fontSize: 27 } }>Local Detour</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={ { height, width } }>
            <WebView source={ { uri: this.props.url } } />
          </View>
        </Content>
      </Container>
    );
  }
}

export { WebViewWrapper as default };
