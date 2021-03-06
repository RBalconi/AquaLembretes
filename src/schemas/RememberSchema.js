export default class RememberSchema {
  static schema = {
    name: 'Remember',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      name: 'string',
      date: 'date',
      time: 'date',
      repeat: 'string',
      aquarium: 'string',
      category: 'string',
      quantity: 'float',
      unity: 'string',
    },
  };
}
