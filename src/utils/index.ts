export const toObject = <Key extends string>(array: ReadonlyArray<Key>) =>
  array.reduce((all, current) => ({ ...all, [current]: current }), {} as {
    [key in Key]: key
  });
