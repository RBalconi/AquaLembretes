import Realm from 'realm';

import AquariumSchema from '../schemas/AquariumSchema';
import RememberSchema from '../schemas/RememberSchema';

export default function getRealm() {
  return Realm.open({
    schema: [AquariumSchema, RememberSchema],
  });
}
