import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import IRoleController from '../../controllers/IControllers/IRoleController';

import config from "../../../config";
import middlewares from '@/api/middlewares/auth/index';
import isValidAuthorization from '@/api/authorization/authorization';
import { SystemRoles } from '@/api/authorization/systemRoles';

const route = Router();

export default (app: Router) => {
  app.use('/roles', route);

  const ctrl = Container.get(config.controllers.role.name) as IRoleController;

  route.post('',
    celebrate({
      body: Joi.object({
        name: Joi.string().required()
      })
    }),
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    (req, res, next) => {
      if(!isValidAuthorization(req.auth.role, [SystemRoles.ADMIN]))
        return res.status(401).send();

      ctrl.createRole(req, res, next)
    });

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required()
      }),
    }),
    (req, res, next) => {
      ctrl.updateRole(req, res, next);
    });
};
