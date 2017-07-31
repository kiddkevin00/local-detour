import Walkthrough from './Walkthrough';
import Swiper from 'react-native-swiper';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


// [TODO] Check the sample styles on GitHub.
const styles = StyleSheet.create({
  slide: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    //marginTop: 731,
    //marginTop: '195%',
  },
  backgroundImage: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    resizeMode: 'stretch',
  },
  heading: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 200,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'white',
    padding: 8,
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#111',
    fontSize: 12,
  },
});

class Landing extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  _checkoutWalkthrough = () => {
    this.props.navigator.push({
      title: 'Get Started',
      component: Walkthrough,
      passProps: { updateNavbarVisibility: this.props.updateNavbarVisibility },
    });
  }

  render() {
    const backgroundImageInlineStyle = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };

    return (
      <Swiper showsButtons={ false }>
        <View style={ styles.slide }>
          <Image
            source={ require('../../../static/assets/images/home.jpg') }
            style={ [styles.backgroundImage, backgroundImageInlineStyle] }
          >
            <TouchableOpacity style={ styles.button } onPress={ this._checkoutWalkthrough }>
              <Text style={ styles.buttonText }>GET STARTED</Text>
            </TouchableOpacity>
          </Image>
        </View>
      </Swiper>
    );
  }

}

export { Landing as default };
