import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConflictDto } from './dto/create-conflict.dto';
import { Conflict } from './entities/conflict.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ConflictsService {
  constructor(
    @InjectRepository(Conflict)
    private readonly conflictRepository: Repository<Conflict>,
  ) {}

  async create(createConflictDto: CreateConflictDto) {
    const result = await this.conflictRepository.insert(createConflictDto);

    return {
      id: result.identifiers[0].id as number,
    };
  }

  // TODO: add pagination
  findAll() {
    return this.conflictRepository.find();
  }

  // TODO: should be visible only to survey owner?
  async findOne(id: number) {
    const conflict = await this.conflictRepository.findOne({ where: { id } });

    if (!conflict) {
      throw new NotFoundException('Conflict is not found');
    }
  }
}
