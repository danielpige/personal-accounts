import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationSearchDto {
  @IsString()
  @IsOptional()
  query?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  currentElements?: number;
}
