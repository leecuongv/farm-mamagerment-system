import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Farm {
    id: string;
    name: string;
}

interface FarmContextType {
  farms: Farm[];
  selectedFarm: Farm | null;
  selectFarm: (farm: Farm) => void;
  loadFarms: (farms: Farm[]) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider = ({ children }: { children: ReactNode }) => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);

  const selectFarm = (farm: Farm) => {
    setSelectedFarm(farm);
    localStorage.setItem('selectedFarm', JSON.stringify(farm));
  };

  const loadFarms = (userFarms: Farm[]) => {
      setFarms(userFarms);
      const storedFarm = localStorage.getItem('selectedFarm');
      if (storedFarm) {
          setSelectedFarm(JSON.parse(storedFarm));
      } else if (userFarms.length > 0) {
          setSelectedFarm(userFarms[0]);
      }
  }

  return (
    <FarmContext.Provider value={{ farms, selectedFarm, selectFarm, loadFarms }}>
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (context === undefined) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
