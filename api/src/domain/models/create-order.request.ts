import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItem } from './order.model';

export class CreateOrderRequest {
    @IsArray()
    @IsNotEmpty({ each: true })
    @ValidateNested({ each: true })
    @Type(() => OrderItem)
    items: OrderItem[];

    constructor(items: OrderItem[]) {
        if (!items || items.length === 0) {
            throw new Error('Order must contain at least one item');
        }
        this.items = items;
    }
}