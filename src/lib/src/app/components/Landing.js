import Events from './Events';
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
    marginTop: 731,
    //marginTop: '200%',
  },
  backgroundImage: {
    flexGrow: 1,
    justifyContent: 'center',
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
    marginTop: 40,
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

  render() {
    const backgroundImageInlineStyle = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };

    return (
      <Swiper showsButtons={ true }>
        <View style={ styles.slide }>
          <Image
            source={ require('../../../static/assets/images/v4_background.png') }
            style={ [styles.backgroundImage, backgroundImageInlineStyle] }
          >
            <Text style={ styles.heading }>
              Let go venture!
            </Text>
            <TouchableOpacity style={ styles.button } onPress={ this._signup }>
              <Text style={ styles.buttonText }>SIGN UP NOW</Text>
            </TouchableOpacity>
          </Image>
        </View>
        <View style={ styles.slide }>
          <Image
            source={ require('../../../static/assets/images/v3_background.png') }
            style={ [styles.backgroundImage, backgroundImageInlineStyle] }
          />
        </View>
        <View style={ styles.slide }>
          <Image
            source={ require('../../../static/assets/images/v2_background.png') }
            style={ [styles.backgroundImage, backgroundImageInlineStyle] }
          />
        </View>
      </Swiper>
    );
  }

  _signup = () => {
    this.props.navigator.push({
      title: 'Sign Up',
      component: Events,
    });
  }

}

export { Landing as default };
