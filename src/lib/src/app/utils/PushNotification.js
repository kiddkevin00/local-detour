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

  static subscribeToTopic = () => {
    FCM.setBadgeNumber(0);

    /*
     * Subscribes this device to a channel.
     * This makes it easy to send notifications to a group of devices.
     */
    FCM.subscribeToTopic(messagingTopic);

    PushNotification._listenToPushNofication();
  }

  /*
   * Asks the OS for permission to show notifications.
   */
  static requestPermission = async () => FCM.requestPermissions()

  /*
   * Generates and/or receives a unique notification token for this device.
   * This makes it easy to send messages to a specific user.
   */
  static fetchUniqueToken = async () => FCM.getFCMToken()

  static handleRefreshToken() {
    FCM.on(FCMEvent.RefreshToken, (token) => {
      console.log(token);

    });
  }

  static _listenToPushNofication() {
    FCM.on(FCMEvent.Notification, (notif) => {
      Alert.alert(notif.aps.alert.title, notif.aps.alert.body);

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

}

export default PushNotification;
