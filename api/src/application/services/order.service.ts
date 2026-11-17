// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/ports/order.repository';
import { CreateOrderRequest } from '../../domain/models/create-order.request';
import { UpdateOrderRequest } from '../../domain/models/update-order.request';
import { Order } from '../../domain/models/order.model';

const VALID_STATE_TRANSITIONS: Record<string, string[]> = {
  'PENDING': ['CONFIRMED', 'CANCELLED'],
  'CONFIRMED': ['SHIPPED', 'CANCELLED'],
  'SHIPPED': ['DELIVERED'],
  'DELIVERED': [],
  'CANCELLED': []
};

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async create(createRequest: CreateOrderRequest): Promise<Order> {
    throw new Error('TODO(reto): create');
  }

  async update(id: string, updateRequest: UpdateOrderRequest): Promise<Order> {
    throw new Error('TODO(reto): update');
  }
}