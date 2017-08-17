import Walkthrough from './Walkthrough';
import Events from './Events';
import Swiper from 'react-native-swiper';
import {
  Container,
  Content,
  Button,
  Text,
} from 'native-base';
import {
  AsyncStorage,
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

class Landing extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  state = {
    waitingForAsyncOps: true,
  };

  componentDidMount() {
    AsyncStorage.getItem('@SystemSetting:shouldSkipWalkthrough')
      .then((shouldSkipWalkthrough) => {
        if (shouldSkipWalkthrough === 'TRUE') {
          this.props.navigator.replace({
            component: Events,
          });
        } else {
          this.setState({
            waitingForAsyncOps: false,
          });
        }
      })
      .catch((err) => {
        // Error happens when retrieving data.
        console.log(err);
      });
  }

  _checkoutWalkthrough = () => {
    this.props.navigator.push({
      component: Walkthrough,
    });
  }

  render() {
    if (this.state.waitingForAsyncOps) return null;

    const backgroundImageInlineStyle = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };

    return (
      <Container>
        <Content >
          <Swiper showsButtons={ false }>
            <Image
              style={ [styles.backgroundImage, backgroundImageInlineStyle] }
              source={ require('../../../static/assets/images/splash-screen.jpg') }
              resizeMode="stretch"
            >
              <Button
                block
                light
                style={ { marginBottom: 80, marginLeft: 20, marginRight: 20, paddingTop: 25, paddingBottom: 25, backgroundColor: '#f96332' } }
                onPress={ this._checkoutWalkthrough }
              >
                <Text style={ { fontSize: 17, color: 'white', fontWeight: 'bold' } }>Let’s get started</Text>
              </Button>
            </Image>
          </Swiper>
        </Content>
      </Container>
    );
  }

}

export { Landing as default };
