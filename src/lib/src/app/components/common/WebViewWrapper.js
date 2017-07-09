import BaseComponent from './BaseComponent';
import { StyleSheet, View, WebView } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column',
  },
});

class WebViewWrapper extends BaseComponent {

  render() {
    return (
      <View style={ styles.container }>
        <WebView source={ { uri: this.props.url } } />
      </View>
    );
  }

}
WebViewWrapper.propTypes = {
  url: PropTypes.string.isRequired,
};

export default WebViewWrapper;
