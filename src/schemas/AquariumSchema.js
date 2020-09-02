export default class AquariumSchema {
  static schema = {
    name: 'Aquarium', // Captain
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      name: 'string',
      imageName: 'string',
      length: 'float',
      width: 'float',
      height: 'float',
      // remembers: {
      //   // ships
      //   type: 'linkingObjects',
      //   objectType: 'Remember', // Ship
      //   property: 'aquariumObj', // captain
      // },
    },
  };
}
