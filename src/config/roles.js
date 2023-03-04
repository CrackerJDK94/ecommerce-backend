const allRoles = {
  user: ['getProducts'],
  admin: ['getUsers', 'manageUsers', 'getProducts', 'managerProducts'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
