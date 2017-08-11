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
        <Header>
          <Left>
            <Button transparent onPress={ this._backToComponent }>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>localDetour</Title>
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
