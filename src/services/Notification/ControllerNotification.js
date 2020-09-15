import getRealm from '../../services/realm';

async function saveNotification(idRemember, idNotification) {
  try {
    const realm = await getRealm();

    const lastNotification = realm
      .objects('Notification')
      .sorted('id', true)[0];
    const highestId = lastNotification == null ? 0 : lastNotification.id;
    const id = highestId == null ? 1 : highestId + 1;

    realm.write(() => {
      realm.create(
        'Notification',
        { id, idRemember, idNotification },
        'modified',
      );
    });
  } catch (error) {
    console.error('Error on save notification: ' + error);
  }
}

async function deleteNotification(idRemember) {
  try {
    const realm = await getRealm();
    const deletingNotification = realm
      .objects('Notification')
      .filtered(`idRemember = '${idRemember}'`);

    realm.write(() => {
      realm.delete(deletingNotification);
    });
  } catch (error) {
    console.error('Error on delete notification: ' + error);
  }
}

export { saveNotification, deleteNotification };
