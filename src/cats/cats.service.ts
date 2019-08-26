import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Cat, Cats } from './cat.interface';
import { CreateCatDto } from './create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel('Cat')
    private readonly catModel: Model<Cat & mongoose.Document>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Cats> {
    const cats = await this.catModel.find().exec();
    return cats;
  }
}
