import ITaskRepo from '@/repos/IRepos/ITaskRepo';
import { Task } from '@/domain/task/task';
import { Inject, Service } from 'typedi';
import { Document, Model } from 'mongoose';
import ITaskPersistence from '@/persistence/dataschema/ITaskPersistence';
import config from '../../config';
import TaskMapper from '@/mappers/taskMapper';
import { TaskId } from '@/domain/task/taskId';

@Service()
export default class TaskRepo implements ITaskRepo {
  constructor(
    @Inject(config.schema.task.name) private schema: Model<ITaskPersistence & Document>,
  ) {
  }

  public async findAll(): Promise<Task[]> {
    const records = await this.schema.find();

    return TaskMapper.toDomainMultiple(records);
  }

  public async findByAuthor(authorId: string): Promise<Task[]> {
    const records = await this.schema.find({ author: authorId });

    return await TaskMapper.toDomainMultiple(records);
  }

  public async findByState(state: string): Promise<Task[]> {
    const records = await this.schema.find({ state: state });

    return await TaskMapper.toDomainMultiple(records);
  }

  public async findByAuthorAndState(authorId: string, state: string): Promise<Task[]> {
    const records = await this.schema.find({ author: authorId, state: state });

    return await TaskMapper.toDomainMultiple(records);
  }

  public async findByDomainId(domainId: string | TaskId): Promise<Task> {
    const record = await this.schema.findOne({ domainId: domainId.toString() });

    return record !== null ? await TaskMapper.toDomain(record) : null;
  }

  public async save(task: Task): Promise<Task> {
    const query = { domainId: task.id.toString() };

    const record = await this.schema.findOne(query);

    const rawTask: any = TaskMapper.toPersistence(task);

    if (record === null) {
      const taskCreated = await this.schema.create(rawTask);

      return TaskMapper.toDomain(taskCreated);
    } else {
      await this.schema.updateOne(query, rawTask);

      return task;
    }
  }
}
