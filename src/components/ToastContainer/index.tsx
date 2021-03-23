import React from 'react';

import { ToastMessages } from '../../hooks/toast';
import Toast from './Toasts';
import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessages[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    <Container>
      {messages.map(message => (
        <Toast key={message.id} message={message} />
      ))}
    </Container>
  );
};

export default ToastContainer;
