import BaseComponent from './BaseComponent';
import {
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    flex: 1,
    marginLeft: 15,
  },
});

class Separator extends BaseComponent {

  render() {
    return (
      <View style={ styles.separator } />
    );
  }

}

export default Separator;
