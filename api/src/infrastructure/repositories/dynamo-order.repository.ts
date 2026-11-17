// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/ports/order.repository';
import { CreateOrderRequest } from '../../domain/models/create-order.request';
import { UpdateOrderRequest } from '../../domain/models/update-order.request';
import { Order, OrderItem } from '../../domain/models/order.model';
import { DynamoDBProvider } from '../providers/dynamodb.provider';
import { PutCommand, GetCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamoOrderRepository implements OrderRepository {
  private readonly tableName: string;

  constructor(
    private readonly dynamoDBProvider: DynamoDBProvider
  ) {
    this.tableName = process.env.DYNAMODB_TABLE_NAME || 'orders';
  }

  async create(createRequest: CreateOrderRequest): Promise<Order> {
    throw new Error('TODO(reto): create');
  }

  async findById(id: string): Promise<Order | null> {
    throw new Error('TODO(reto): findById');
  }

  async update(id: string, updateRequest: UpdateOrderRequest): Promise<Order> {
    throw new Error('TODO(reto): update');
  }

  async delete(id: string): Promise<void> {
    throw new Error('TODO(reto): delete');
  }

  private generateOrderId(): string {
    throw new Error('TODO(reto): generateOrderId');
  }
}