import React, { createContext, useState, useContext } from 'react';

const EmailContext = createContext(); //SelectedItemContext

export const SelectedEmail = () => useContext(EmailContext); //useSelectedItem

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState([""]);

  return (
    <EmailContext.Provider value={{ email,setEmail}}>
      {children}
    </EmailContext.Provider>
  );
};
