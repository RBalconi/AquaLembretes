import Realm from 'realm';

import AquariumSchema from '../schemas/AquariumSchema';

export default function getRealm() {
  return Realm.open({
    schema: [AquariumSchema],
  });
}
