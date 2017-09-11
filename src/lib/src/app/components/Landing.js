import actionCreator from '../actioncreators/landing';
import Walkthrough from './Walkthrough';
import Events from './Events';
import EventDetail from './EventDetail';
import Swiper from 'react-native-swiper';
import {
  Container,
  Content,
  Button,
  Text,
} from 'native-base';
import {
  Linking,
  AsyncStorage,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';


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
    waitingForAsyncOps: PropTypes.bool.isRequired,
    dispatchFinishWaitingForAsyncOps: PropTypes.func.isRequired,

    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  componentDidMount() {
    AsyncStorage.getItem('@SystemSetting:shouldSkipWalkthrough')
      .then((shouldSkipWalkthrough) => {
        if (shouldSkipWalkthrough === 'TRUE') {
          this.props.navigator.replace({
            component: Events,
          });
        } else {
          this.props.dispatchFinishWaitingForAsyncOps();
        }
      })
      .catch((err) => {
        console.log(`Something went wrong when retrieving data - ${err}`);
      });

    Linking.getInitialURL()
      .then((url) => {
        if (url) {
          this._handleOpenURL({ url });
        }
      })
      .catch((err) => {
        console.log(`Something went wrong when getting launch URL - ${err}`);
      });

    Linking.addEventListener('url', this._handleOpenURL);
  }

  componentWillUnmount() {
    //Linking.removeEventListener('url', this._handleOpenURL);
  }

  _handleOpenURL = (event) => {
    const url = event.url.split('?');
    const path = url[0];
    const params = url[1] ? qs.parse(url[1]) : null;

    if (path && params && params.event) {
      this.props.navigator.push({
        component: EventDetail,
        passProps: {
          eventName: JSON.parse(params.event),
        },
      });
    }
  }

  _checkoutWalkthrough = () => {
    this.props.navigator.push({
      component: Walkthrough,
    });
  }

  render() {
    if (this.props.waitingForAsyncOps) return null;

    const backgroundImageInlineStyle = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
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
                onPress={ this._checkoutWalkthrough }
                style={ {
                  marginBottom: 80,
                  marginHorizontal: 20,
                  paddingTop: 25,
                  paddingBottom: 25,
                  backgroundColor: '#f96332',
                } }
              >
                <Text style={ { fontSize: 17, color: 'white', fontWeight: 'bold' } }>Let’s Get Started</Text>
              </Button>
            </Image>
          </Swiper>
        </Content>
      </Container>
    );
  }

}

function mapStateToProps(state) {
  return {
    waitingForAsyncOps: state.landing.waitingForAsyncOps,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    dispatchFinishWaitingForAsyncOps() {
      dispatch(actionCreator.finishWaitingForAsyncOps());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
