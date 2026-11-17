import { OrderService } from '../application/services/order.service';
import { OrderController } from '../infrastructure/controllers/order.controller';
import { OrderRepository } from '../domain/ports/order.repository';
import { UpdateOrderRequest } from '../domain/models/update-order.request';
import { Order, OrderItem } from '../domain/models/order.model';

describe('OrderService.update - fase f2', () => {
  let orderService: OrderService;
  let mockOrderRepository: jest.Mocked<OrderRepository>;

  const createMockOrder = (id: string, status: string): Order => {
    const item = new OrderItem('prod-1', 2, 50.0);
    return new Order(id, status, [item], new Date().toISOString(), new Date().toISOString());
  };

  beforeEach(() => {
    mockOrderRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<OrderRepository>;
    orderService = new OrderService(mockOrderRepository);
  });

  describe('should update an order with valid transition', () => {
    it('given an existing order and a valid state transition request, when OrderService.update is invoked, then the order is updated in DynamoDB and the updated order is returned', async () => {
      const existingOrder = createMockOrder('order-123', 'PENDING');
      const updateRequest = new UpdateOrderRequest('CONFIRMED');
      const updatedOrder = createMockOrder('order-123', 'CONFIRMED');

      mockOrderRepository.findById.mockResolvedValue(existingOrder);
      mockOrderRepository.update.mockResolvedValue(updatedOrder);

      const result = await orderService.update('order-123', updateRequest);

      expect(mockOrderRepository.findById).toHaveBeenCalledWith('order-123');
      expect(mockOrderRepository.update).toHaveBeenCalledWith('order-123', updateRequest);
      expect(result.status).toBe('CONFIRMED');
    });
  });

  describe('should reject invalid state transition', () => {
    it('given an existing order and an invalid state transition request, when OrderService.update is invoked, then a validation error is thrown and the order is not updated in DynamoDB', async () => {
      const existingOrder = createMockOrder('order-123', 'SHIPPED');
      const updateRequest = new UpdateOrderRequest('PENDING');

      mockOrderRepository.findById.mockResolvedValue(existingOrder);

      await expect(orderService.update('order-123', updateRequest)).rejects.toThrow('Invalid state transition');
      expect(mockOrderRepository.update).not.toHaveBeenCalled();
    });
  });
});

describe('OrderController.update - fase f2', () => {
  let controller: OrderController;
  let mockOrderService: jest.Mocked<OrderService>;

  beforeEach(() => {
    mockOrderService = {
      create: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<OrderService>;
    controller = new OrderController(mockOrderService);
  });

  describe('should update an order via REST endpoint', () => {
    it('given a valid HTTP request to update an order, when PUT /orders/:id is invoked, then returns 200 and the updated order in the response body', async () => {
      const mockId = 'order-123';
      const mockBody = { status: 'CONFIRMED' };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;
      const updatedOrder = {
        id: 'order-123',
        status: 'CONFIRMED',
        items: [{ productId: 'prod-1', quantity: 2, price: 50 }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockOrderService.update.mockResolvedValue(updatedOrder);

      await controller.update(mockId, mockBody, mockRes);

      expect(mockOrderService.update).toHaveBeenCalledWith('order-123', expect.objectContaining({ status: 'CONFIRMED' }));
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(updatedOrder);
    });
  });

  describe('should reject invalid update with 400', () => {
    it('given an HTTP request with invalid data to update an order, when PUT /orders/:id is invoked, then returns 400 and an error message', async () => {
      const mockId = 'order-123';
      const mockBody = { status: '' };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      mockOrderService.update.mockRejectedValue(new Error('Status cannot be empty'));

      await controller.update(mockId, mockBody, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Status cannot be empty' }));
    });
  });
});