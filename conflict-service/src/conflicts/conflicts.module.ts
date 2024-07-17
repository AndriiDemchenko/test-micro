import { Module } from '@nestjs/common';
import { ConflictsService } from './conflicts.service';
import { ConflictsController } from './conflicts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conflict } from './entities/conflict.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Conflict]), AuthModule],
  controllers: [ConflictsController],
  providers: [ConflictsService],
})
export class ConflictsModule {}
