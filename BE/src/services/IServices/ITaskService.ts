import { Result } from '@/core/logic/Result';
import ICreateTaskRequest from '@/dto/Request/ICreateTaskRequest';
import ITaskResponse from '@/dto/Response/ITaskResponse';

export default interface ITaskService {
  findAll(): Promise<Result<ITaskResponse[]>>;

  create(body: ICreateTaskRequest, email: string): Promise<Result<ITaskResponse>>;

  findMyTasks(email: string): Promise<Result<ITaskResponse[]>>;

  findTaskByState(stateString: string): Promise<Result<ITaskResponse[]>>;

  findMyTaskByState(stateString: string, email: string): Promise<Result<ITaskResponse[]>>;
}
