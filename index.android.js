import Landing from './app/components/Landing';
import { AppRegistry } from 'react-native';
import React, { Component } from 'react';


class localDetour extends Component {

  render() {
    return (
      <Landing />
    );
  }

}

AppRegistry.registerComponent('localDetour', () => localDetour);

export default localDetour;
