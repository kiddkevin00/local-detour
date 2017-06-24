import Main from './app/components/Main';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
});

class SpiritualGuide extends Component {

  render() {
    return (
      <Main />
    );
  }

}

AppRegistry.registerComponent('SpiritualGuide', () => SpiritualGuide);

export default SpiritualGuide;
