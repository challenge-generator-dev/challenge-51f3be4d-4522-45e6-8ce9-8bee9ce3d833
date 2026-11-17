import axios from 'axios';
import { Order, CreateOrderRequest, UpdateOrderRequest } from '../models/order.model';

const API_BASE_URL = 'http://localhost:3000';

export const useOrders = () => {
  const createOrder = async (orderData: CreateOrderRequest): Promise<Order | null> => {
    try {
      const response = await axios.post<Order>(`${API_BASE_URL}/orders`, orderData);
      return response.data;
    } catch (err) {
      console.error('Error creating order:', err);
      return null;
    }
  };

  const updateOrder = async (id: string, updateData: UpdateOrderRequest): Promise<Order | null> => {
    try {
      const response = await axios.put<Order>(`${API_BASE_URL}/orders/${id}`, updateData);
      return response.data;
    } catch (err) {
      console.error('Error updating order:', err);
      return null;
    }
  };

  const getOrder = async (id: string): Promise<Order | null> => {
    try {
      const response = await axios.get<Order>(`${API_BASE_URL}/orders/${id}`);
      return response.data;
    } catch (err) {
      console.error('Error fetching order:', err);
      return null;
    }
  };

  const deleteOrder = async (id: string): Promise<boolean> => {
    try {
      await axios.delete(`${API_BASE_URL}/orders/${id}`);
      return true;
    } catch (err) {
      console.error('Error deleting order:', err);
      return false;
    }
  };

  const fetchOrders = async (): Promise<Order[]> => {
    try {
      const response = await axios.get<Order[]>(`${API_BASE_URL}/orders`);
      return response.data;
    } catch (err) {
      console.error('Error fetching orders:', err);
      return [];
    }
  };

  return {
    createOrder,
    updateOrder,
    getOrder,
    deleteOrder,
    fetchOrders,
  };
};