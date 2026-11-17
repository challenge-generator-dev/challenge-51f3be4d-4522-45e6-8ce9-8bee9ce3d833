import { OrderItem } from './order-item.model';

export class Order {
    id: string;
    status: string;
    items: OrderItem[];
    createdAt: string;
    updatedAt: string;

    constructor(
        id: string,
        status: string,
        items: OrderItem[],
        createdAt: string = new Date().toISOString(),
        updatedAt: string = new Date().toISOString()
    ) {
        if (!id || id.trim() === '') {
            throw new Error('Order ID cannot be empty');
        }
        if (!status || status.trim() === '') {
            throw new Error('Order status cannot be empty');
        }
        if (!items || items.length === 0) {
            throw new Error('Order must contain at least one item');
        }

        this.id = id;
        this.status = status;
        this.items = items;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    updateStatus(newStatus: string): void {
        if (!newStatus || newStatus.trim() === '') {
            throw new Error('Status cannot be empty');
        }
        this.status = newStatus;
        this.updatedAt = new Date().toISOString();
    }

    calculateTotal(): number {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
}

export class OrderItem {
    productId: string;
    quantity: number;
    price: number;

    constructor(productId: string, quantity: number, price: number) {
        if (!productId || productId.trim() === '') {
            throw new Error('Product ID cannot be empty');
        }
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
        if (price <= 0) {
            throw new Error('Price must be greater than zero');
        }

        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
    }
}