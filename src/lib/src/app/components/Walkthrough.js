import Events from './Events';
import Swiper from 'react-native-swiper';
import {
  Container,
  Content,
  Button,
  Text,
} from 'native-base';
import {
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  backgroundImage: {
    //flexGrow: 1,
    justifyContent: 'flex-end',
    //alignItems: 'center',
    //resizeMode: 'stretch',
  },
});

class Walkthrough extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  _checkoutEvents = () => {
    this.props.navigator.replace({
      component: Events,
    });
  }

  render() {
    const backgroundImageInlineStyle = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    };
    const buttonStyle = {
      marginBottom: 80,
      marginLeft: 20,
      marginRight: 20,
      paddingTop: 25,
      paddingBottom: 25,
    };

    return (
      <Container>
        <Content>
          <Swiper showsButtons={ false } loop={ false } index={ 0 } activeDotColor="white">
            <Image
              style={ [styles.backgroundImage, backgroundImageInlineStyle] }
              source={ require('../../../static/assets/images/walkthrough_1.jpg') }
              resizeMode="stretch"
            />
            <Image
              style={ [styles.backgroundImage, backgroundImageInlineStyle] }
              source={ require('../../../static/assets/images/walkthrough_2.jpg') }
              resizeMode="stretch"
            />
            <Image
              style={ [styles.backgroundImage, backgroundImageInlineStyle] }
              source={ require('../../../static/assets/images/walkthrough_3.jpg') }
              resizeMode="stretch"
            >
              <Button style={ buttonStyle } block light onPress={ this._checkoutEvents }>
                <Text style={ { fontSize: 17, fontWeight: '500' } }>Explore Now</Text>
              </Button>
            </Image>
          </Swiper>
        </Content>
      </Container>
    );
  }

}

export { Walkthrough as default };
