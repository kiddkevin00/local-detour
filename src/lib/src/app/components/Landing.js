import actionCreator from '../actioncreators/landing';
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
import { connect } from 'react-redux';
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
    dispatchFinishWaitingForAsyncOps: PropTypes.func.isRequired,
    waitingForAsyncOps: PropTypes.bool.isRequired,

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
                <Text style={ { fontSize: 17, color: 'white', fontWeight: 'bold' } }>Let’s get started</Text>
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
