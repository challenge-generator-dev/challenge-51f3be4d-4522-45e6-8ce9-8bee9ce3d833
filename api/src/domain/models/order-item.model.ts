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