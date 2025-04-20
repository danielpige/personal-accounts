import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { DatabaseModule } from 'src/database.module';
import { AuthenticationProviders } from './authentication.providers';
import { AuthenticationRepository } from './authentication.repository';

@Module({
  controllers: [AuthenticationController],
  imports: [DatabaseModule],
  providers: [
    ...AuthenticationProviders,
    AuthenticationService,
    AuthenticationRepository,
  ],
  exports: [AuthenticationRepository],
})
export class AuthenticationModule {}
