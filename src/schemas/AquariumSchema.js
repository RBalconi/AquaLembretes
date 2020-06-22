export default class AquariumSchema {
  static schema = {
    name: 'Aquarium',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      name: 'string',
      imageName: 'string',
      length: 'int',
      width: 'int',
      height: 'int',
    },
  };
}
