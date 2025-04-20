import { DataSource, Repository } from 'typeorm';
import { Authentication } from './entities/authentication.entity';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationRepository extends Repository<Authentication> {
  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    super(Authentication, dataSource.createEntityManager());
  }

  async findByProperty(
    propertyName: string,
    value: any,
  ): Promise<Authentication> {
    return this.findOne({ where: { [propertyName]: value } });
  }
}
