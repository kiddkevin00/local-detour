import BaseComponent from './BaseComponent';
import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#48BBEC',
    paddingBottom: 10,
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    marginTop: 10,
    alignSelf: 'center',
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white',
  },
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
  },
});

class Badge extends BaseComponent {

  render() {
    return (
      <View style={ styles.container }>
        <Image style={ styles.image } source={ { uri: this.props.avatarUrl } } />
        <Text style={ styles.name }>{ this.props.name }</Text>
        <Text style={ styles.handle }>{ this.props.login }</Text>
      </View>
    );
  }

}
Badge.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  name: PropTypes.string,
  login: PropTypes.string.isRequired,
};
Badge.defaultProps = {
  name: '',
};

export { Badge as default };
