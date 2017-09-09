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
import moment from 'moment';
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

    Linking.addEventListener('url', this._handleOpenURL);
  }

  componentWillUnmount() {
    //Linking.removeEventListener('url', this._handleOpenURL);
  }

  _handleOpenURL = (event) => {
    const url = event.url.split('?');
    const path = url[0];
    const params = url[1] ? qs.parse(url[1]) : null;

    if (path && params && params.name) {
      this.props.navigator.replace({
        component: EventDetail,
        passProps: {
          event: {
            name: params.name,
            type: 'Public',
            editorComment: 'Stay tuned! Coming soon...',
            detail: 'typing...',
            cost: '$0',
            where: {
              venue: 'Typing Venue...',
              address: 'typing address...',
              coordinate: {
                latitude: 40.7582904,
                longitude: -73.9668905,
              },
            },
            when: {
              startTimestamp: moment('2107-01-01T00:00').valueOf(),
              endTimestamp: moment('2107-01-02T00:00').valueOf(),
            },
            externalLink: 'https://localdetour.herokuapp.com/',
            heroPhoto: 'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/public%2Fcoming-soon.jpeg?alt=media&token=644ac5ec-6a78-45af-be32-11e041578171',
            previousPhotos: [
              'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/public%2Fimage-coming-soon.png?alt=media&token=a1c411af-8ac3-4657-bab5-e5063cfe1ced',
            ],
            photos: [
              'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/public%2Fimage-coming-soon.png?alt=media&token=a1c411af-8ac3-4657-bab5-e5063cfe1ced',
              'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/public%2Fimage-coming-soon_2.png?alt=media&token=99e76ff0-1c65-41a9-8650-5f65f3ea00ed',
              'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/public%2Fimage-coming-soon_3.png?alt=media&token=64f9720f-7810-4c63-8059-4f8658ce74fd',
              'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/public%2Fimage-coming-soon_4.png?alt=media&token=d1ccfaa7-f157-4235-98a9-e15183054745',
              'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/public%2Fimage-coming-soon_5.png?alt=media&token=64385e44-9e30-45cf-b381-94982f00f9cf',
            ],
            tags: ['#Placeholder'],
          },
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
