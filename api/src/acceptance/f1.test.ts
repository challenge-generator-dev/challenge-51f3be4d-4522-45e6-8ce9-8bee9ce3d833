import { OrderService } from '../application/services/order.service';
import { OrderRepository } from '../domain/ports/order.repository';
import { CreateOrderRequest } from '../domain/models/create-order.request';
import { UpdateOrderRequest } from '../domain/models/update-order.request';
import { Order, OrderItem } from '../domain/models/order.model';

describe('OrderService - Phase 1 Acceptance Tests', () => {
  let orderService: OrderService;
  let mockOrderRepository: jest.Mocked<OrderRepository>;

  beforeEach(() => {
    mockOrderRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    } as jest.Mocked<OrderRepository>;
    orderService = new OrderService(mockOrderRepository);
  });

  describe('should create an order with valid data', () => {
    it('given a valid CreateOrderRequest, when OrderService.create is invoked, then the order is persisted and returned', async () => {
      const validItems = [new OrderItem('PROD-001', 2, 99.99)];
      const createRequest = new CreateOrderRequest(validItems);
      const expectedOrder = new Order('ORD-123', 'PENDING', validItems);

      mockOrderRepository.create.mockResolvedValue(expectedOrder);

      const result = await orderService.create(createRequest);

      expect(mockOrderRepository.create).toHaveBeenCalledWith(createRequest);
      expect(result).toEqual(expectedOrder);
    });
  });

  describe('should reject an order with invalid data', () => {
    it('given a request with empty items, when OrderService.create is invoked, then validation error is thrown', async () => {
      const createRequest = new CreateOrderRequest([]);

      await expect(orderService.create(createRequest)).rejects.toThrow('Order must contain at least one item');
      expect(mockOrderRepository.create).not.toHaveBeenCalled();
    });

    it('given a request with empty productId, when OrderService.create is invoked, then validation error is thrown', async () => {
      const invalidItems = [new OrderItem('', 2, 99.99)];
      const createRequest = new CreateOrderRequest(invalidItems);

      await expect(orderService.create(createRequest)).rejects.toThrow('Product ID cannot be empty');
      expect(mockOrderRepository.create).not.toHaveBeenCalled();
    });

    it('given a request with zero quantity, when OrderService.create is invoked, then validation error is thrown', async () => {
      const invalidItems = [new OrderItem('PROD-001', 0, 99.99)];
      const createRequest = new CreateOrderRequest(invalidItems);

      await expect(orderService.create(createRequest)).rejects.toThrow('Quantity must be greater than zero');
      expect(mockOrderRepository.create).not.toHaveBeenCalled();
    });

    it('given a request with negative price, when OrderService.create is invoked, then validation error is thrown', async () => {
      const invalidItems = [new OrderItem('PROD-001', 2, -10)];
      const createRequest = new CreateOrderRequest(invalidItems);

      await expect(orderService.create(createRequest)).rejects.toThrow('Price must be greater than zero');
      expect(mockOrderRepository.create).not.toHaveBeenCalled();
    });
  });
});

describe('DynamoOrderRepository - Phase 1 Acceptance Tests', () => {
  let repository: any;
  let mockClient: any;
  let mockProvider: any;
  let mockTableConfig: any;

  beforeEach(() => {
    mockClient = {
      send: jest.fn()
    };
    mockProvider = {
      getClient: jest.fn().mockReturnValue(mockClient)
    };
    mockTableConfig = {
      tableName: 'orders-table'
    };

    jest.resetModules();
    const { DynamoOrderRepository } = require('../infrastructure/repositories/dynamo-order.repository');
    repository = new DynamoOrderRepository(mockProvider, mockTableConfig);
  });

  describe('should save an order in DynamoDB', () => {
    it('given a valid order, when DynamoOrderRepository.save is invoked, then the order is saved and returned', async () => {
      const validItems = [new OrderItem('PROD-001', 2, 99.99)];
      const createRequest = new CreateOrderRequest(validItems);

      mockClient.send.mockResolvedValue({});

      const result = await repository.create(createRequest);

      expect(mockClient.send).toHaveBeenCalled();
      expect(result).toBeInstanceOf(Order);
      expect(result.status).toBe('PENDING');
    });
  });

  describe('should handle DynamoDB errors', () => {
    it('given a valid order and a failing DynamoDB client, when DynamoOrderRepository.save is invoked, then a domain error is thrown', async () => {
      const validItems = [new OrderItem('PROD-001', 2, 99.99)];
      const createRequest = new CreateOrderRequest(validItems);

      mockClient.send.mockRejectedValue(new Error('Connection timeout'));

      await expect(repository.create(createRequest)).rejects.toThrow('Failed to create order');
    });
  });
});

describe('OrderController - Phase 1 Acceptance Tests', () => {
  let controller: OrderController;
  let mockOrderService: jest.Mocked<OrderService>;

  beforeEach(() => {
    mockOrderService = {
      create: jest.fn(),
      update: jest.fn()
    } as jest.Mocked<OrderService>;
    controller = new OrderController(mockOrderService);
  });

  describe('should create an order via REST endpoint', () => {
    it('given a valid HTTP request, when POST /orders is invoked, then 201 and the created order are returned', async () => {
      const mockRequest = {
        body: {
          items: [{ productId: 'PROD-001', quantity: 2, price: 99.99 }]
        }
      } as any;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as any;
      const expectedOrder = new Order('ORD-123', 'PENDING', [new OrderItem('PROD-001', 2, 99.99)]);

      mockOrderService.create.mockResolvedValue(expectedOrder);

      await controller.create(mockRequest, mockResponse);

      expect(mockOrderService.create).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedOrder);
    });
  });

  describe('should reject invalid request with 400', () => {
    it('given an HTTP request with invalid data, when POST /orders is invoked, then 400 and error message are returned', async () => {
      const mockRequest = {
        body: {
          items: []
        }
      } as any;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as any;

      await controller.create(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 400
        })
      );
    });
  });
});