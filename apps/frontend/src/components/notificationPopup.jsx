import React from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Box } from '@chakra-ui/react';
import { useNotification } from '../../context/NotificationContext';

const NotificationPopup = () => {
    const { isOpen, message, type, onClose } = useNotification();

    if (!isOpen) return null;

    return (
        <Box position="fixed" bottom="4" right="4" zIndex="toast">
            <Alert status={type} variant="solid" borderRadius="md">
                <AlertIcon />
                <Box flex="1">
                    <AlertTitle>{type === 'success' ? 'Success' : 'Error'}</AlertTitle>
                    <AlertDescription>{message}</AlertDescription>
                </Box>
                <CloseButton position="absolute" right="4" top="4" onClick={onClose} />
            </Alert>
        </Box>
    );
};

export default NotificationPopup;
