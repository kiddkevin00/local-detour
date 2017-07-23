import Landing from './src/lib/src/app/components/EventsMapView';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} from 'react-native';
import React, { Component } from 'react';


// [TODO] Removes this line after adding Redux integration.
global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

console.ignoredYellowBox = ['Using <Image> with children is deprecated and will be an error in the near future. Please reconsider the layout or use <ImageBackground> instead.'];

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

class localDetour extends Component {

  render() {
    return (
      <NavigatorIOS
        style={ styles.container }
        initialRoute={ { title: 'Welcome', component: Landing } }
      />
    );
  }

}

AppRegistry.registerComponent('localDetour', () => localDetour);

export default localDetour;
