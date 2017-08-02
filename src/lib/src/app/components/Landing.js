import Walkthrough from './Walkthrough';
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


// [TODO] Check the sample styles on GitHub.
const styles = StyleSheet.create({
  backgroundImage: {
    //flexGrow: 1,
    justifyContent: 'flex-end',
    //alignItems: 'center',
    //resizeMode: 'stretch',
  },
});

class Landing extends Component {

  static propTypes = {
    updateNavbarVisibility: PropTypes.func.isRequired,
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
      <Container>
        <Content>
          <Swiper showsButtons={ false }>
            <Image
              style={ [styles.backgroundImage, backgroundImageInlineStyle] }
              source={ require('../../../static/assets/images/home.jpg') }
              resizeMode="stretch"
            >
              <Button
                block
                light
                style={ { marginBottom: 80, marginLeft: 20, marginRight: 20, paddingTop: 25, paddingBottom: 25, backgroundColor: '#f96332' } }
                onPress={ this._checkoutWalkthrough }
              >
                <Text style={ { fontSize: 15, color: 'white', fontWeight: 'bold' } }>Let’s get started</Text>
              </Button>
            </Image>
          </Swiper>
        </Content>
      </Container>
    );
  }

}

export { Landing as default };
