import PushNotification from '../utils/PushNotification';
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

class PushNotificationPermReq extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  _requestPushNoficationPerm = async () => {
    PushNotification.requestPermission();
    PushNotification.subscribeToTopic();

    try {
      await AsyncStorage.setItem('@SystemSetting:shouldRequestPushNotificationPerm', 'TRUE')
      this._backToComponent();
    } catch (err) {
      // Error saving data.
      console.log(err);
    }
  }

  _backToComponent = () => {
    this.props.navigator.pop();
  }

  render() {
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
              source={ require('../../../static/assets/images/push-notification-perm-req.jpg') }
              resizeMode="stretch"
            >
              <Button
                block
                light
                onPress={ this._requestPushNoficationPerm }
                style={ {
                  backgroundColor: '#f96332',
                  marginBottom: 5,
                  marginHorizontal: 20,
                  paddingTop: 25,
                  paddingBottom: 25,
                } }
              >
                <Text style={ { fontSize: 17, color: 'white', fontWeight: 'bold' } }>Notify Me</Text>
              </Button>
              <Button
                block
                transparent
                onPress={ this._backToComponent }
                style={ {
                  marginBottom: 10,
                  marginHorizontal: 20,
                  paddingTop: 25,
                  paddingBottom: 25,
                } }
              >
                <Text style={ { fontSize: 17, color: 'grey' } }>No Thanks</Text>
              </Button>
            </Image>
          </Swiper>
        </Content>
      </Container>
    );
  }

}

export { PushNotificationPermReq as default };
