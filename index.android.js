import Landing from './app/components/Landing';
import { AppRegistry } from 'react-native';
import React, { Component } from 'react';


class SpiritualGuide extends Component {

  render() {
    return (
      <Landing />
    );
  }

}

AppRegistry.registerComponent('SpiritualGuide', () => SpiritualGuide);

export default SpiritualGuide;
