import { NextFunction, Request, Response } from 'express';

export default interface ITaskController {
  findAll(req: Request, res: Response, next: NextFunction): Promise<void>;

  create(req: Request, res: Response, next: NextFunction): Promise<void>;

  findMyTasks(req: Request, res: Response, next: NextFunction): Promise<void>;

  findTaskByState(req: Request, res: Response, next: NextFunction): Promise<void>;

  findMyTaskByState(req: Request, res: Response, next: NextFunction): Promise<void>;
}
