import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const resetAppState = () => {
    setSelectedFrame(null);
    setCapturedImage(null);
  };

  return (
    <AppContext.Provider value={{
      selectedFrame,
      setSelectedFrame,
      capturedImage,
      setCapturedImage,
      resetAppState
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};