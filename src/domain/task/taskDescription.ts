import { ValueObject } from '@/core/domain/ValueObject';
import { Guard } from '@/core/logic/Guard';
import { Result } from '@/core/logic/Result';

interface TaskDescriptionProps {
  value: string;
}

export default class TaskDescription extends ValueObject<TaskDescriptionProps> {
  private constructor(props: TaskDescriptionProps) {
    super(props);
  }

  get value (): string {
    return this.props.value;
  }

  public static create (description: string): Result<TaskDescription> {
    const guardResult = Guard
      .againstNullOrUndefined(description, 'description');

    if (!guardResult.succeeded) {
      return Result.fail<TaskDescription>(guardResult.message);
    }

    const guardResult2 = (description.length < 300 && description.length > 10);

    if (!guardResult2) {
      return Result
        .fail<TaskDescription>('Description must be between 10 and 300 characters');
    }

    return Result.ok<TaskDescription>(new TaskDescription({ value: description }));
  }
}
