import { DataSource, Repository } from 'typeorm';
import { Authentication } from './entities/authentication.entity';
import { Inject, Injectable } from '@nestjs/common';
import { EntityUtils } from 'src/common/utils/entity.util';

@Injectable()
export class AuthenticationRepository extends Repository<Authentication> {
  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    super(Authentication, dataSource.createEntityManager());
  }

  async dataExistsByProperty(
    propertyName: keyof Authentication,
    value: any,
  ): Promise<boolean> {
    const isValidColumn = EntityUtils.isColumnPresent<Authentication>(
      this.dataSource,
      Authentication,
      propertyName,
    );

    if (!isValidColumn) {
      throw new Error(
        `Invalid property "${propertyName}" for Authentication entity`,
      );
    }

    return await this.createQueryBuilder('user')
      .where({ [propertyName]: value })
      .getExists();
  }
}
