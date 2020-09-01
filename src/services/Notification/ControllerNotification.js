import getRealm from '../../services/realm';

async function loadRememberById(id) {
  const realm = await getRealm();
  const loadedRemember = realm.objectForPrimaryKey('Remember', id);
  return loadedRemember;
}

async function saveNotification(rememberId, idNotification) {
  try {
    const realm = await getRealm();

    const lastNotification = realm
      .objects('Notification')
      .sorted('id', true)[0];
    const highestId = lastNotification == null ? 0 : lastNotification.id;
    const id = highestId == null ? 1 : highestId + 1;

    const rememberObj = await loadRememberById(rememberId);

    realm.write(() => {
      realm.create(
        'Notification',
        { id, idNotification, remember: rememberObj.Remember },
        'modified',
      );
    });
  } catch (error) {
    console.error('Error on save notification: ' + error);
  }
}

async function deleteNotification(notificationId) {
  try {
    const realm = await getRealm();
    const deletingNotification = realm
      .objects('Notification')
      .filtered(`id = '${notificationId}'`);

    realm.write(() => {
      realm.delete(deletingNotification);
    });
  } catch (error) {
    console.error('Error on delete notification: ' + error);
  }
}

export { saveNotification, deleteNotification };
