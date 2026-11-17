import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { OrderService } from './application/services/order.service';
import { OrderController } from './infrastructure/controllers/order.controller';
import { DynamoOrderRepository } from './infrastructure/repositories/dynamo-order.repository';
import { DynamoDBProvider } from './infrastructure/providers/dynamodb.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [OrderController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
    DynamoDBProvider,
    {
      provide: 'DYNAMODB_TABLE_CONFIG',
      useFactory: (configService: ConfigService) => ({
        tableName: configService.get<string>('DYNAMODB_TABLE_NAME', 'orders'),
        region: configService.get<string>('AWS_REGION', 'us-east-1'),
      }),
      inject: [ConfigService],
    },
    DynamoOrderRepository,
    OrderService,
  ],
})
export class AppModule {}