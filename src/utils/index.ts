export const toObject = <Key extends string>(array: ReadonlyArray<Key>) =>
  array.reduce((all, current) => ({ ...all, [current]: current }), {} as {
    [key in Key]: key
  });

export const toNativeConstructor = (value: string | number | boolean | {}) => {
  if (Array.isArray(value)) {
    return Array;
  } else {
    switch (typeof value) {
      case 'string':
        return String;
      case 'number':
        return Number;
      case 'boolean':
        return Boolean;
      default:
        return Object;
    }
  }
};
