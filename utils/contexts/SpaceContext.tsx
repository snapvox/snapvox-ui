import React, { createContext, useContext, useState } from 'react';

interface SpaceContextProps {
  spaceType: string;
  updateSpaceType: (newSpaceType: string) => void;
}

const SpaceContext = createContext<SpaceContextProps | undefined>(undefined);

interface SpaceProviderProps {
  children: React.ReactNode;
}

export const SpaceProvider: React.FC<SpaceProviderProps> = ({ children }) => {
  const [spaceType, setSpaceType] = useState('');

  const updateSpaceType = (newSpaceType: string) => {
    setSpaceType(newSpaceType);
  };

  return (
    <SpaceContext.Provider value={{ spaceType, updateSpaceType }}>
      {children}
    </SpaceContext.Provider>
  );
};

export const useSpaceContext = (): SpaceContextProps => {
  const context = useContext(SpaceContext);
  if (!context) {
    throw new Error('Context must be used within a SpaceProvider');
  }
  return context;
};