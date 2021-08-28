const authRoot = '/auth';
const usersRoot = '/user';

export const routes = {
  auth: {
    signin: `${authRoot}/signin`,
    signup: `${authRoot}/signup`,
  },
  user: {
    root: usersRoot,
    delete: `${usersRoot}/:id`,
  },
};
