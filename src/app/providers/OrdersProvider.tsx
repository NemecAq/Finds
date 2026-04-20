import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order } from '../../shared/types';
import { orderApi } from '../../shared/api/order';
import { useAuth } from './AuthProvider';

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date'>) => Promise<void>;
  getOrderById: (id: string) => Order | undefined;
  loading: boolean;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated && user) {
      loadOrders();
    } else if (!authLoading && !isAuthenticated) {
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    }
  }, [isAuthenticated, authLoading, user]);

  const loadOrders = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const response = await orderApi.getUserOrders(user.id);
      setOrders(response);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const addOrder = async (orderData: Omit<Order, 'id' | 'date'>) => {
    if (isAuthenticated) {
      try {
        await orderApi.createOrder({
          shippingAddress: orderData.address,
          paymentMethod: orderData.paymentMethod
        });
        await loadOrders();
      } catch (error) {
        console.error('Failed to create order:', error);
        throw error;
      }
    } else {
      const newOrder: Order = {
        ...orderData,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      };
      const newOrders = [newOrder, ...orders];
      setOrders(newOrders);
      localStorage.setItem('orders', JSON.stringify(newOrders));
    }
  };

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, getOrderById, loading }}>
      {children}
    </OrdersContext.Provider>
  );
};