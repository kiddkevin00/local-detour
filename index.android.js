import Landing from './src/lib/src/app/components/Landing';
import { AppRegistry } from 'react-native';
import React, { Component } from 'react';


class LocalDetour extends Component {

  render() {
    return (
      <Landing />
    );
  }

}

AppRegistry.registerComponent('LocalDetour', () => LocalDetour);

export default LocalDetour;
