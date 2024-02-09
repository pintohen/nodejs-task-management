import { ValueObject } from '@/core/domain/ValueObject';
import { Result } from '@/core/logic/Result';
import { Guard } from '@/core/logic/Guard';

interface TaskNameProps {
  value: string;
}

export class TaskName extends ValueObject<TaskNameProps> {
  private constructor(props: TaskNameProps) {
    super(props);
  }

  get value (): string {
    return this.props.value;
  }

  public static create (name: string): Result<TaskName> {
    const guardResult = Guard.againstNullOrUndefined(name, 'name');

    if (!guardResult.succeeded) {
      return Result.fail<TaskName>(guardResult.message);
    }

    const guardResult2 = (name.length < 100 && name.length > 2);

    if (!guardResult2) {
      return Result
        .fail<TaskName>('Name must be between 2 and 100 characters');
    }

    return Result.ok<TaskName>(new TaskName({ value: name }));
  }
}
