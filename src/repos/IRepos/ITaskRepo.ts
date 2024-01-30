import { Task } from '@/domain/task/task';

export default interface ITaskRepo {
  findAll(): Promise<Task[]>;
  findByAuthor(authorId: string): Promise<Task[]>;
  findByAuthorAndState(authorId: string, state: string): Promise<Task[]>;
  findByDomainId(domainId: string): Promise<Task>;
  findByState(state: string): Promise<Task[]>;
  save(task: Task): Promise<Task>;
}
