// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { useState } from 'react';
import { Order, CreateOrderRequest, OrderItem } from '../../shared/models/order.model';
import { useOrders } from '../../shared/hooks/useOrders';

interface OrderFormProps {
  onSubmit: (order: Order) => void;
}

export function OrderForm({ onSubmit }: OrderFormProps): JSX.Element {
  throw new Error('TODO(reto): anonymous');
}

export default OrderForm;