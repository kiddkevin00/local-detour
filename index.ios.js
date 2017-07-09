import Landing from './src/lib/src/app/components/Landing';
import { AppRegistry, StyleSheet, NavigatorIOS } from 'react-native';
import React, { Component } from 'react';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

class SpiritualGuide extends Component {

  render() {
    return (
      <NavigatorIOS
        style={ styles.container }
        initialRoute={ { title: 'Welcome', component: Landing } }
      />
    );
  }

}

AppRegistry.registerComponent('SpiritualGuide', () => SpiritualGuide);

export default SpiritualGuide;
