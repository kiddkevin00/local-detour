import Main from './app/components/Main';
import { AppRegistry, StyleSheet, NavigatorIOS } from 'react-native';
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
      <NavigatorIOS
        initialRoute={ { title: 'Spiritual Guide', component: Main } }
        style={ styles.container }
      />
    );
  }

}

AppRegistry.registerComponent('SpiritualGuide', () => SpiritualGuide);

export default SpiritualGuide;
