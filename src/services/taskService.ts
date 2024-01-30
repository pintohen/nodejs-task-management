import ITaskService from '@/services/IServices/ITaskService';
import { Task } from '@/domain/task/task';
import { Result } from '@/core/logic/Result';
import { Inject, Service } from 'typedi';
import config from '../../config';
import ITaskRepo from '@/repos/IRepos/ITaskRepo';
import IUserRepo from '@/repos/IRepos/IUserRepo';
import { TaskFactory } from '@/domain/task/TaskFactory';
import TaskMapper from '@/mappers/taskMapper';
import ITaskResponse from '@/dto/Response/ITaskResponse';
import { TaskState } from '@/domain/task/taskState';

@Service()
export default class TaskService implements ITaskService {
  constructor(
    @Inject(config.repos.task.name) private repo: ITaskRepo,
    @Inject(config.repos.user.name) private userRepo: IUserRepo,
  ) {
  }

  public async findAll(): Promise<Result<ITaskResponse[]>> {
    const tasks = await this.repo.findAll();

    return Result
      .ok<ITaskResponse[]>(TaskMapper.toResponseMultiple(tasks));
  }

  public async findMyTasks(email: string): Promise<Result<ITaskResponse[]>> {
    const user = await this.userRepo.findByEmail(email);

    if(!user) {
      return Result.fail<ITaskResponse[]>('User not found');
    }

    const tasks = await this.repo.findByAuthor(user.id.toString());

    return Result
      .ok<ITaskResponse[]>(TaskMapper.toResponseMultiple(tasks));
  }

  public async findTaskByState(stateString: string): Promise<Result<ITaskResponse[]>> {
    const taskStateObject : TaskState = TaskState[stateString.toUpperCase()];

    if(!taskStateObject) {
      return Result.fail<ITaskResponse[]>('Invalid state');
    }

    const tasks = await this.repo.findByState(stateString.toUpperCase());

    return Result
      .ok<ITaskResponse[]>(TaskMapper.toResponseMultiple(tasks));
  }

  public async findMyTaskByState(stateString: string, email: string): Promise<Result<ITaskResponse[]>> {
    const taskStateObject : TaskState = TaskState[stateString.toUpperCase()];

    if(!taskStateObject) {
      return Result.fail<ITaskResponse[]>('Invalid state');
    }

    const user = await this.userRepo.findByEmail(email);

    if(!user) {
      return Result.fail<ITaskResponse[]>('User not found');
    }

    const tasks = await this.repo.findByAuthorAndState(user.id.toString(), stateString.toUpperCase());

    return Result
      .ok<ITaskResponse[]>(TaskMapper.toResponseMultiple(tasks));
  }

  public async create(body: any, email: string): Promise<Result<ITaskResponse>> {
    const user = await this.userRepo.findByEmail(email);

    if(!user) {
      return Result.fail<ITaskResponse>('User not found');
    }

    const task = TaskFactory
      .createTask(body.name, body.description, user);

    if(task.isFailure) {
      return Result.fail<ITaskResponse>(task.errorValue());
    }

    const savedTask = await this.repo.save(task.getValue());

    return Result.ok<ITaskResponse>(TaskMapper.toResponse(savedTask));
  }
}
