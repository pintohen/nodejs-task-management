import { Request, Response, NextFunction } from 'express';
import isValidAuthorization from '@/api/authorization/authorization';
import { SystemRoles } from '@/api/authorization/systemRoles';
import { Container } from 'typedi';
import config from '../../../../config';
import ITaskController from '@/controllers/IControllers/ITaskController';
import { Logger } from 'winston';


let ctrl: ITaskController;
let logger: Logger;

const getAllTasks = (req: Request, res: Response, next: NextFunction) => {

  ctrl = initCtrl();
  logger = initLogger();

  if (!isValidAuthorization(req.user.role, [SystemRoles.ADMIN])) {
    return res
      .status(401)
      .send();
  }

  ctrl.findAll(req, res, next).then(
    () => {
      logger.info('GET on /api/tasks');
    },
  );
};

const getMyTasks = (req: Request, res: Response, next: NextFunction) => {
  ctrl = initCtrl();
  logger = initLogger();

  if (!isValidAuthorization(req.user.role, SystemRoles.allRoles())) {
    return res
      .status(401)
      .send();
  }

  ctrl.findMyTasks(req, res, next).then(
    () => {
      logger.info('GET on /api/tasks/me');
    },
  );
};

const getTaskByState = (req: Request, res: Response, next: NextFunction) => {
  ctrl = initCtrl();
  logger = initLogger();

  if (!isValidAuthorization(req.user.role, [SystemRoles.ADMIN])) {
    return res
      .status(401)
      .send();
  }

  ctrl.findTaskByState(req, res, next).then(
    () => {
      logger.info('GET on /api/tasks/:state');
    },
  );
};

const getMyTaskByState = (req: Request, res: Response, next: NextFunction) => {
  ctrl = initCtrl();
  logger = initLogger();

  if (!isValidAuthorization(req.user.role, SystemRoles.allRoles())) {
    return res
      .status(401)
      .send();
  }

  ctrl.findMyTaskByState(req, res, next).then(
    () => {
      logger.info('GET on /api/tasks/me/:state');
    },
  );
};

const create = (req: Request, res: Response, next: NextFunction) => {
  ctrl = initCtrl();
  logger = initLogger();

  if (!isValidAuthorization(req.user.role, SystemRoles.allRoles())) {
    return res
      .status(401)
      .send();
  }

  ctrl.create(req, res, next).then(
    () => {
      logger.info('POST on /api/tasks');
    },
  );
};

function initCtrl() {
  return Container
    .get(config.controllers.task.name) as ITaskController;
}

function initLogger() {
  return Container
    .get('logger') as Logger;
}

export default {
  getAllTasks,
  create,
  getMyTasks,
  getTaskByState,
  getMyTaskByState,
};
