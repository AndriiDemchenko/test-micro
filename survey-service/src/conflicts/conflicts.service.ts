import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Conflict, ConflictsService } from './conflicts.interface';

@Injectable()
export class ConflictService implements OnModuleInit {
  private conflictsService: ConflictsService;

  constructor(@Inject('CONFLICT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.conflictsService =
      this.client.getService<ConflictsService>('ConflictsService');
  }

  create(conflict: Conflict): Promise<{ id: number }> {
    return firstValueFrom(this.conflictsService.create(conflict));
  }
}
