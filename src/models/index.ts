export const roles = ['admin'] as const;
export type Role = typeof roles[number];
export type Roles = Role[];
export const role = roles.reduce(
  (allRoles, currentRole) => ({
    ...allRoles,
    [currentRole]: currentRole,
  }),
  {} as { [key in Role]: key },
);

export const metaDataKeys = ['roles'] as const;
export type MetaDataKey = typeof metaDataKeys[number];
export const metaDataKey = metaDataKeys.reduce(
  (keys, key) => ({ ...keys, [key]: key }),
  {} as { [key in MetaDataKey]: key },
);

export interface User {
  roles: Roles;
}
