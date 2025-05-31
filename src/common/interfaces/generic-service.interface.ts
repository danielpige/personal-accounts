import { PaginationSearchDto } from 'src/common/dtos/pagination-search.dto';
import { GenericResponse } from './generic-response.interface';
import { GenericPaginationData } from './generic-pagination-data.interface';

export interface GenericServiceInterface<T> {
  create(data: Partial<T>): Promise<GenericResponse<T>>;
  findAll(
    data: PaginationSearchDto,
  ): Promise<GenericResponse<GenericPaginationData<T>>>;
  findOne(id: string): Promise<GenericResponse<T>>;
  update(id: string, data: Partial<T>): Promise<GenericResponse<T>>;
  remove(id: string): Promise<GenericResponse<T>>;
}
