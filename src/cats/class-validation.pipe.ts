import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ClassValidationPipe implements PipeTransform<unknown> {
  private isNativeConstructor(metatype: ArgumentMetadata['metatype']): boolean {
    const types: Array<ArgumentMetadata['metatype']> = [
      String,
      Boolean,
      Number,
      Array,
      Object,
    ];

    return types.includes(metatype);
  }

  async transform(
    value: unknown,
    { metatype }: ArgumentMetadata,
  ): Promise<unknown | never> {
    if (!metatype || this.isNativeConstructor(metatype)) {
      return value as unknown;
    }

    const object = plainToClass(metatype, value);

    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    } else {
      return value as unknown;
    }
  }
}
