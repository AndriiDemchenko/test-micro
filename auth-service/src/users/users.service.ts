import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(data: Omit<User, 'id' | 'status'>) {
    return this.usersRepository.insert(new User(data));
  }

  findOneByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  checkIsUsernameTaken(username: string) {
    return this.usersRepository.exists({ where: { username } });
  }
}
