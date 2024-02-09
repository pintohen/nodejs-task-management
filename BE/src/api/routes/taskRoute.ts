import { Router } from 'express';
import middlewares from '@/api/middlewares/auth';
import taskMiddlewares from '@/api/middlewares/tasks/middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/tasks', route);

  route.get(
    '',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    taskMiddlewares.getAllTasks
  );

  route.post(
    '',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    taskMiddlewares.create
  );

  route.get(
    '/me',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    taskMiddlewares.getMyTasks
  );

  route.get(
    '/:state',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    taskMiddlewares.getTaskByState
  );

  route.get(
    'me/:state',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    taskMiddlewares.getMyTaskByState
  );

}
