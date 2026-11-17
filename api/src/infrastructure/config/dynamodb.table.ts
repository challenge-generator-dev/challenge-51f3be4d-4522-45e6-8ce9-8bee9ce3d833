export interface DynamoDBTableConfig {
    tableName: string;
    keySchema: Array<{
        AttributeName: string;
        KeyType: 'HASH' | 'RANGE';
    }>;
    attributeDefinitions: Array<{
        AttributeName: string;
        AttributeType: 'S' | 'N' | 'B';
    }>;
    provisionedThroughput: {
        ReadCapacityUnits: number;
        WriteCapacityUnits: number;
    };
}

export const ORDERS_TABLE_CONFIG: DynamoDBTableConfig = {
    tableName: process.env.DYNAMODB_TABLE_NAME || 'Orders',
    keySchema: [
        { AttributeName: 'id', KeyType: 'HASH' }
    ],
    attributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' }
    ],
    provisionedThroughput: {
        ReadCapacityUnits: parseInt(process.env.DYNAMODB_READ_CAPACITY || '5', 10),
        WriteCapacityUnits: parseInt(process.env.DYNAMODB_WRITE_CAPACITY || '5', 10)
    }
};