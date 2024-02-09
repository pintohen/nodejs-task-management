import { Task } from '@/domain/task/task';
import config from '../../config';
import { Container } from 'typedi';
import IUserRepo from '@/repos/IRepos/IUserRepo';
import { TaskName } from '@/domain/task/taskName';
import TaskDescription from '@/domain/task/taskDescription';
import { TaskState } from '@/domain/task/taskState';
import ITaskResponse from '@/dto/Response/ITaskResponse';
import ITaskPersistence from '@/persistence/dataschema/ITaskPersistence';
import { TaskId } from '@/domain/task/taskId';

export default class TaskMapper {
  public static async toDomain (raw: ITaskPersistence): Promise<Task> {
    const userRepo = Container.get(config.repos.user.name) as IUserRepo;

    const user = await userRepo.findById(raw.author);

    return Task.create({
      name: TaskName.create(raw.name).getValue(),
      description: TaskDescription.create(raw.description).getValue(),
      state: TaskState[raw.state],
      author: user
    }, new TaskId(raw.domainId)).getValue();
  }

  public static async toDomainMultiple (rawRecords: ITaskPersistence[]): Promise<Task[]> {
    const records: Task[] = [];

    for (const rawRecord of rawRecords) {
      const record = await this.toDomain(rawRecord);

      records.push(record);
    }

    return records;
  }



  public static toPersistence (task: Task): ITaskPersistence {
    return {
      domainId: task.id.toString(),
      name: task.name.value,
      description: task.description.value,
      state: task.state.toString(),
      author: task.author.id.toString()
    };
  }

  public static toResponse (task: Task): ITaskResponse {
    return {
      id: task.id.toString(),
      name: task.name.value,
      description: task.description.value,
      state: task.state.toString(),
      author: task.author.email.value
    };
  }

  public static toResponseMultiple (tasks: Task[]): ITaskResponse[] {
    return tasks.map(task => this.toResponse(task));
  }
}
