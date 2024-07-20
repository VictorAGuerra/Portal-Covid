import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { NotificationProvider } from './context/NotificationContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <NotificationProvider>
      <AppRoutes />
    </NotificationProvider>
  </ChakraProvider>
);
