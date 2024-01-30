import { Task } from '@/domain/task/task';
import { Result } from '@/core/logic/Result';
import { User } from '@/domain/user/user';
import { TaskName } from '@/domain/task/taskName';
import TaskDescription from '@/domain/task/taskDescription';
import { TaskState } from '@/domain/task/taskState';

export class TaskFactory {
    public static createTask(name: string, description: string, author: User) : Result<Task> {
        const nameResult = TaskName.create(name);

        if(nameResult.isFailure) {
            return Result.fail<Task>(nameResult.errorValue());
        }

        const descriptionResult = TaskDescription.create(description);

        if(descriptionResult.isFailure) {
            return Result.fail<Task>(descriptionResult.errorValue());
        }

        const props = {
          name: nameResult.getValue(),
          description: descriptionResult.getValue(),
          state: TaskState.TODO,
          author: author,
        };

        const task = Task.create(props);

        if(task.isFailure) {
          return Result.fail<Task>(task.errorValue());
        }

        return Result.ok<Task>(task.getValue());
    }
}
