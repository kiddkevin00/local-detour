import Login from './Login';
import Signup from './Signup';
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Right,
  Title,
  Button,
  Text,
  Icon,
} from 'native-base';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Events extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  state = {};

  _gotoLogin = () => {
    this.props.navigator.push({
      component: Login,
    });
  }

  _gotoSignup = () => {
    this.props.navigator.push({
      component: Signup,
    });
  }

  _backToComponent = () => {
    this.props.navigator.pop();
  }

  render() {
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
          <Button primary full small iconLeft onPress={ this._gotoLogin }>
            <Icon name="log-in" />
            <Text>Log In</Text>
          </Button>
          <Button warning full small iconLeft onPress={ this._gotoSignup }>
            <Icon name="home" />
            <Text>Sign Up</Text>
          </Button>
        </Content>
      </Container>
    );
  }

}

export { Events as default };
