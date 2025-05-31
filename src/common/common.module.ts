import { Module } from '@nestjs/common';
import { ExceptionService } from './services/exception.service';
import { ResponseService } from './services/response.service';

@Module({
  providers: [ExceptionService, ResponseService],
  exports: [ExceptionService, ResponseService],
})
export class CommonModule {}
