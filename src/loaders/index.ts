import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';
import config from '../../config';
//We have to import at least all the events once so they can be triggered
import './events';
import bootstrap from '@/loaders/bootstrap';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  if (process.argv.includes('--bootstrap')) {
    Logger.info('✌️ Running bootstrap...');
    await bootstrap(mongoConnection);
    Logger.info('✌️ Bootstrap finished!');
  }

  if(process.argv.includes('--bootstrap-only')) {
    Logger.info('✌️ Running bootstrap...');
    await bootstrap(mongoConnection);
    Logger.info('✌️ Bootstrap finished!');
    return;
  }

  // user
  const userSchema = {
    name: config.schema.user.name,
    schema: config.schema.user.path
  };

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  // role
  const roleSchema = {
    name: config.schema.role.name,
    schema: config.schema.role.path
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  // task
  const taskController = {
    name: config.controllers.task.name,
    path: config.controllers.task.path
  };

  const taskService = {
    name: config.services.task.name,
    path: config.services.task.path
  };

  const taskRepo = {
    name: config.repos.task.name,
    path: config.repos.task.path
  };

  const taskSchema = {
    name: config.schema.task.name,
    schema: config.schema.task.path
  };

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      taskSchema
    ],
    controllers: [
      roleController,
      taskController
    ],
    repos: [
      roleRepo,
      userRepo,
      taskRepo
    ],
    services: [
      roleService,
      taskService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
