import { Order } from '../models/order.model';
import { CreateOrderRequest } from '../models/create-order.request';
import { UpdateOrderRequest } from '../models/update-order.request';

export interface OrderRepository {
    create(order: CreateOrderRequest): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    update(id: string, updateRequest: UpdateOrderRequest): Promise<Order>;
    delete(id: string): Promise<void>;
}