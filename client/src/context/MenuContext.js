import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible)
  }

  const toggleAside = () => {
    setSidebarVisible(!sidebarVisible)
  }

  return (
    <MenuContext.Provider value={{
      sidebarVisible,
      setSidebarVisible,
      mobileMenuVisible,
      setMobileMenuVisible,
      toggleMobileMenu,
      toggleAside
    }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
