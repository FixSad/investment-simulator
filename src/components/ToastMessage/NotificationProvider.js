import React, { createContext, useState } from 'react';
import Notification from './Notification';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [style, setStyle] = useState("success");

  const showNotification = (text, color) => {
    setMessage(text);
    setStyle(color);
    setTimeout(() => setMessage(null), 5000);
  };

  return (
      <NotificationContext.Provider value={{ showNotification }}>
        {children}
      <Notification message={message} style={style}/>
    </NotificationContext.Provider>
  );
};