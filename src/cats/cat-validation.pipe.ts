import * as Joi from '@hapi/joi';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CatKeys, CreateCatDto } from './create-cat.dto';

type CatSchema = { [key in CatKeys]: Joi.Schema };
const catSchema: CatSchema = {
  name: Joi.string(),
  age: Joi.number(),
  breed: Joi.string(),
};

@Injectable()
export class CatValidationPipe implements PipeTransform {
  readonly schema = Joi.object().keys(catSchema);
  transform(value: unknown, metadata: ArgumentMetadata): CreateCatDto | never {
    const { error } = Joi.validate(value, this.schema);

    if (error) {
      throw new BadRequestException('Validation failed');
    } else {
      return value as CreateCatDto;
    }
  }
}
