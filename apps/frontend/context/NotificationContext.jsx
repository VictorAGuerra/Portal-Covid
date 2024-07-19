import React, { createContext, useContext, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success');

    const showNotification = (msg, type) => {
        setMessage(msg);
        setType(type);
        onOpen();
    };

    return (
        <NotificationContext.Provider value={{ isOpen, message, type, showNotification, onClose }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    return useContext(NotificationContext);
};
