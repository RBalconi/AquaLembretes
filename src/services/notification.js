import PushNotification from 'react-native-push-notification';

function NotificationConfigure() {
  PushNotification.configure({
    onRegister: function(token) {
      console.log('TOKEN:', token);
    },
    onNotification: function(notification) {
      console.log('NOTIFICATION:', notification);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: false,
  });
}

export default NotificationConfigure;
