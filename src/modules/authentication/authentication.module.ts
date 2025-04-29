import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { DatabaseModule } from 'src/database.module';
import { AuthenticationProviders } from './authentication.providers';
import { AuthenticationRepository } from './authentication.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CommonModule } from 'src/common/common.module';
import { EnvConfiguration } from 'src/config/app.config';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  controllers: [AuthenticationController],
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: EnvConfiguration().jwtSecret,
      signOptions: {
        expiresIn: '2h',
      },
    }),
    CommonModule,
  ],
  providers: [
    ...AuthenticationProviders,
    AuthenticationService,
    AuthenticationRepository,
    JwtStrategy,
  ],
  exports: [AuthenticationRepository, JwtStrategy],
})
export class AuthenticationModule {}
