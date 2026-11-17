// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamoDBProvider {
    private readonly client: DynamoDBDocumentClient;

    constructor(private readonly configService: ConfigService) {
        const dynamoDBClient = new DynamoDBClient({
            region: this.configService.get<string>('AWS_REGION', 'us-east-1'),
            credentials: {
                accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID', ''),
                secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY', ''),
            },
        });

        this.client = DynamoDBDocumentClient.from(dynamoDBClient);
    }

    getClient(): DynamoDBDocumentClient {
        return this.client;
    }

    async healthCheck(): Promise<boolean> {
      throw new Error('TODO(reto): healthCheck');
    }
}

import { ListTablesCommand } from '@aws-sdk/client-dynamodb';