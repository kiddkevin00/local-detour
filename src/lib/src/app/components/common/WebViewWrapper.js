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
    backToComponent: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  _backToEventDetail = () => {
    this.props.navigator.push({
      component: this.props.backToComponent,
    });
  }

  render() {
    const { width, height } = Dimensions.get('window');

    return (
      <Container>
        <Header searchBar rounded>
          <Left>
            <Button transparent onPress={ this._backToEventDetail }>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Item>
            <Icon name="ios-search" />
            <Input />
          </Item>
          <Right>
            <Button transparent>
              <Text>Search</Text>
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
