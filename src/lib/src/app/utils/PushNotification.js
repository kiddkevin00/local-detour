import FCM, {
  FCMEvent,
  NotificationType,
  WillPresentNotificationResult,
  RemoteNotificationResult,
} from 'react-native-fcm';
import {
  Platform,
  Alert,
} from 'react-native';


const messagingTopic = 'nyc-events';

class PushNotification {

  static subscribeToTopic = async () => {
    // Asks the OS for permission to show notifications.
    try {
      PushNotification._requestPermission();

      /*
       * Subscribes this device to a channel.
       * This makes it easy to send notifications to a group of devices.
       */
      FCM.subscribeToTopic(messagingTopic);

      PushNotification._listenToPushNofication();
      PushNotification.fetchUniqueToken();
      PushNotification.fetchRefreshToken();
    } catch (err) {
      console.log(err);
    }
  }

  static _requestPermission = async () => {
    return FCM.requestPermissions();
  }

  static _listenToPushNofication() {
    FCM.on(FCMEvent.Notification, async (notif) => {
      console.log(notif);

      /*
       * The iOS devices need to have some special handling to "finish" the incoming
       * notifications in different ways depending on the notification type.
       */
      if (Platform.OS === 'ios') {
        switch (notif._notificationType) {
          case NotificationType.Remote:
            /*
             * Other types available:
             * `RemoteNotificationResult.NewData`, `RemoteNotificationResult.ResultFailed`
             */
            notif.finish(RemoteNotificationResult.NewData);
            break;
          case NotificationType.NotificationResponse:
            notif.finish();
            break;
          case NotificationType.WillPresent:
            /*
             * Other types available:
             * `WillPresentNotificationResult.None`
             */
            notif.finish(WillPresentNotificationResult.All);
            break;
        }
      }
    });
  }

  /*
   * Generates and/or receives a unique notification token for this device.
   * This makes it easy to send messages to a specific user.
   */
  static fetchUniqueToken() {
    FCM.getFCMToken()
      .then((token) => {
        console.log(token);

      });
  }

  static fetchRefreshToken() {
    FCM.on(FCMEvent.RefreshToken, (token) => {
      console.log(token);

    });
  }
}

export default PushNotification;
