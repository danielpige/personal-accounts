import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    AuthenticationModule,
    CommonModule,
  ],
  controllers: [],
})
export class AppModule {}
