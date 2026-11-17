// TODO(reto): archivo stubbeado; implementa los cuerpos.
import React, { useEffect, useState } from 'react';
import { Order } from './shared/models/order.model';
import { useOrders } from './shared/hooks/useOrders';
import { OrderForm } from './features/orders/OrderForm';

const App: React.FC = () => {
  throw new Error('TODO(reto): App');
};

interface OrderListProps {
  orders: Order[];
  onUpdate: (id: string, status: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onUpdate, onDelete }) => {
  return (
    <div>
      <h3>Órdenes Existentes</h3>
      {orders.length === 0 ? (
        <p>No hay órdenes</p>
      ) : (
        orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

interface OrderCardProps {
  order: Order;
  onUpdate: (id: string, status: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onUpdate, onDelete }) => {
  throw new Error('TODO(reto): anonymous');
};

export default App;