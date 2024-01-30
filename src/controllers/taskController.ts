import ITaskController from '@/controllers/IControllers/ITaskController';
import { Result } from '@/core/logic/Result';
import { Inject, Service } from 'typedi';
import config from '../../config';
import ITaskService from '@/services/IServices/ITaskService';
import { Task } from '@/domain/task/task';
import ICreateTaskRequest from '@/dto/Request/ICreateTaskRequest';
import ITaskResponse from '@/dto/Response/ITaskResponse';

@Service()
export default class TaskController implements ITaskController {

  constructor(
    @Inject(config.services.task.name) private service: ITaskService,
  ) {

  }
  public async findAll(req: any, res: any, next: any): Promise<void> {
    try {
      const result : Result<ITaskResponse[]> = await this.service
        .findAll();

      if(result.isFailure) {
        return res
          .status(403)
          .send();
      }

      return res
        .status(200)
        .send(result.getValue());
    } catch (e) {
      next(e);
    }
  }

  public async findMyTasks(req: any, res: any, next: any): Promise<void> {
    try {
      const result : Result<ITaskResponse[]> = await this.service
        .findMyTasks(req.auth.email);

      if(result.isFailure) {
        return res
          .status(403)
          .send();
      }

      return res
        .status(200)
        .send(result.getValue());
    } catch (e) {
      next(e);
    }
  }

  public async findTaskByState(req: any, res: any, next: any): Promise<void> {
    try {
      const result : Result<ITaskResponse[]> = await this.service
        .findTaskByState(req.params.state);

      if(result.isFailure) {
        return res
          .status(403)
          .send();
      }

      return res
        .status(200)
        .send(result.getValue());
    } catch (e) {
      next(e);
    }
  }

  public async findMyTaskByState(req: any, res: any, next: any): Promise<void> {
    try {
      const result : Result<ITaskResponse[]> = await this.service
        .findMyTaskByState(req.params.state, req.auth.email);

      if(result.isFailure) {
        return res
          .status(403)
          .send();
      }

      return res
        .status(200)
        .send(result.getValue());
    } catch (e) {
      next(e);
    }
  }

  public async create(req: any, res: any, next: any): Promise<void> {
    try {
      const result : Result<ITaskResponse> = await this.service
        .create(req.body as ICreateTaskRequest, req.auth.email);

      if(result.isFailure) {
        return res
          .status(403)
          .send(result.error);
      }

      return res
        .status(201)
        .send(
          result.getValue()
        );
    } catch (e) {
      next(e);
    }
  }
}
