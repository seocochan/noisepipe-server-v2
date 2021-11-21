const authRoot = '/auth';
const usersRoot = '/users';
const collectionsRoot = '/collections';

export const routes = {
  auth: {
    signin: `${authRoot}/signin`,
    signup: `${authRoot}/signup`,
    password: `${authRoot}/password`,
  },
  user: {
    root: usersRoot,
    me: `${usersRoot}/me`,
    id: `${usersRoot}/:id`,
    username: `${usersRoot}/:username`,
    usernameCollection: `${usersRoot}/:username/collections`,
    validateUsername: `${usersRoot}/validation/username`,
  },
  collection: {
    root: collectionsRoot,
  },
};
