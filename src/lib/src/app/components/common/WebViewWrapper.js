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

function WebViewWrapper(props) {
  return (
    <View style={ styles.container }>
      <WebView source={ { uri: props.url } } />
    </View>
  );
}
WebViewWrapper.propTypes = {
  url: PropTypes.string.isRequired,
};

export { WebViewWrapper as default };
