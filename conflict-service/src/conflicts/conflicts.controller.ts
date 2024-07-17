import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ConflictsService } from './conflicts.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateConflictDto } from './dto/create-conflict.dto';
import { GRcpConflict } from './conflicts.interface';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('conflicts')
export class ConflictsController {
  constructor(private readonly conflictsService: ConflictsService) {}

  @GrpcMethod('ConflictsService', 'create')
  async create(createConflictDto: CreateConflictDto): Promise<GRcpConflict> {
    return this.conflictsService.create(createConflictDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.conflictsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conflictsService.findOne(+id);
  }
}
