import Realm from 'realm';

import AquariumSchema from '../schemas/AquariumSchema';
import RememberSchema from '../schemas/RememberSchema';
import NotificationSchema from '../schemas/NotificationSchema';

export default function getRealm() {
  return Realm.open({
    schema: [AquariumSchema, RememberSchema, NotificationSchema],
  });
}
