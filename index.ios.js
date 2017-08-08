import Landing from './src/lib/src/app/components/Landing';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Platform,
  Alert,
} from 'react-native';
import React, { Component } from 'react';

////////////////////////////////////////////////////////////////////////////////////////////////////
import FCM, {
  FCMEvent,
  NotificationType,
  WillPresentNotificationResult,
  RemoteNotificationResult,
} from 'react-native-fcm';


// Asks the OS for permission to show notifications.
FCM.requestPermissions();

// Generates and/or receives a unique notification token for this device. It lets us send messages to specific users.
FCM.getFCMToken()
  .then(token => {
    console.log(token);

  });

// Subscribes users to the a channel. This makes it easy to send notifications to a group of devices.
FCM.subscribeToTopic('nyc-events');

// Handles notifications when they come in
FCM.on(FCMEvent.Notification, async (notif) => {
  console.log(notif);
  Alert.alert('Event Update', JSON.stringify(notif, null, 2));

  // iOS devices need to have some special handling to “finish” notifications in different ways depending on the type.
  if (Platform.OS === 'ios') {
    switch (notif._notificationType) {
      case NotificationType.Remote:
        notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
        break;
      case NotificationType.NotificationResponse:
        notif.finish();
        break;
      case NotificationType.WillPresent:
        notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
        break;
    }
  }
});

FCM.on(FCMEvent.RefreshToken, token => {
  console.log(token);

});
////////////////////////////////////////////////////////////////////////////////////////////////////

// [TODO] Removes this line after adding Redux integration.
global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

console.ignoredYellowBox = ['Using <Image> with children is deprecated and will be an error in the near future. Please reconsider the layout or use <ImageBackground> instead.'];

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

class LocalDetour extends Component {

  state = {
    isNavbarHidden: true,
  };

  render() {
    return (
      <NavigatorIOS
        style={ styles.container }
        navigationBarHidden={ this.state.isNavbarHidden }
        initialRoute={ {
          title: 'Welcome',
          component: Landing,
        } }
      />
    );
  }

}

AppRegistry.registerComponent('localDetour', () => LocalDetour);

export default LocalDetour;
