// src/components/UI/Notification.tsx
import React, { useEffect } from 'react';
import './Notification.css';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'warning';
  duration?: number;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose 
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

export default Notification;