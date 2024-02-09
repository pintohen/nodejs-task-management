import rolesBootstrap from '@/bootstrappers/roles-bootstrap';
import usersBootstrap from '@/bootstrappers/users-bootstrap';

export default async (mongoConnection) => {
  await rolesBootstrap(mongoConnection);
  await usersBootstrap(mongoConnection);
};
