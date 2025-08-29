import React, { useEffect, useRef } from 'react';
import './Notification.css'; // Подключаем стили

const Notification = ({ message }) => {
  const notificationRef = useRef(null);

  useEffect(() => {
    if (message && notificationRef.current) {
      notificationRef.current.style.animation = 'slide-down 0.5s ease-in-out forwards';
      setTimeout(() => {
        notificationRef.current.style.animation = 'slide-up 0.5s ease-in-out forwards';
      }, 4500); 
    }
  }, [message]);

  return (
    <div ref={notificationRef} className="notification" style={{ display: message ? 'block' : 'none' }}>
      <div className="notification-content">{message}</div>
    </div>
  );
};

export default Notification;