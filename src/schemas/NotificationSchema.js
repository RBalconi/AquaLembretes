export default class NotificationSchema {
  static schema = {
    name: 'Notification',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      idNotification: 'int',
      remember: { type: 'list', objectType: 'Remember' },
    },
  };
}
