import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    AuthenticationModule,
  ],
  controllers: [],
})
export class AppModule {}
