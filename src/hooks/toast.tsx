import React, { createContext, useCallback, useContext, useState } from 'react';

import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

export interface ToastMessages {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(message: Omit<ToastMessages, 'id'>): void;
  removeToast(id: string): void;
}

const toastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessages[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessages, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages(oldMessages => [...oldMessages, toast]);
    },
    [],
  );
  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <toastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </toastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(toastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
