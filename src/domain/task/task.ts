import { AggregateRoot } from '@/core/domain/AggregateRoot';
import { TaskName } from '@/domain/task/taskName';
import TaskDescription from '@/domain/task/taskDescription';
import { TaskState } from '@/domain/task/taskState';
import { Guard } from '@/core/logic/Guard';
import { User } from '@/domain/user/user';
import { TaskId } from '@/domain/task/taskId';
import { Result } from '@/core/logic/Result';

interface TaskProps {
  name: TaskName;
  description: TaskDescription;
  state: TaskState;
  author: User;
}

export class Task extends AggregateRoot<TaskProps> {
  private constructor(props: TaskProps, taskId?: TaskId) {
    super(props, taskId);
  }

  get id (): TaskId {
    return this._id as TaskId;
  }

  get name (): TaskName {
    return this.props.name;
  }

  get description (): TaskDescription {
    return this.props.description;
  }

  get state (): TaskState {
    return this.props.state;
  }

  get author (): User {
    return this.props.author;
  }

  public static create (props: TaskProps, taskId?: TaskId): Result<Task> {
    const guardedProps = [
      { argument: props.name, argumentName: 'name' },
      { argument: props.description, argumentName: 'description' },
      { argument: props.state, argumentName: 'state' },
      { argument: props.author, argumentName: 'author' }
    ];

    const res = Guard
      .againstNullOrUndefinedBulk(guardedProps);

    if(!res.succeeded) {
      return Result.fail<Task>(res.message);
    }

    return Result.ok(new Task(props, taskId));
  }
}
