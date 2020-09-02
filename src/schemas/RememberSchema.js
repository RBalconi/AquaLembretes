export default class RememberSchema {
  static schema = {
    name: 'Remember', // Ship
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      name: 'string',
      date: 'date',
      time: 'date',
      repeat: 'string',
      // aquarium: { type: 'list', objectType: 'Aquarium' },
      // aquariumObj: 'Aquarium[]', // captain: Captain
      aquarium: 'string',
      category: 'string',
      quantity: 'float',
      unity: 'string',
    },
  };
}
