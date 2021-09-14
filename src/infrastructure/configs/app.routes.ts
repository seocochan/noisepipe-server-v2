const authRoot = '/auth';
const usersRoot = '/users';

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
    validateUsername: `${usersRoot}/validation/username`,
  },
};
