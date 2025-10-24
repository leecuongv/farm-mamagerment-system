
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { Farm } from '../types';
import { getMockFarms } from '../services/mockApiService';
import { useAuth } from './AuthContext';

interface FarmContextType {
  currentFarm: Farm | null;
  userFarms: Farm[];
  selectFarm: (farmId: string) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const allFarms = useMemo(() => getMockFarms(), []);
  const [currentFarm, setCurrentFarm] = useState<Farm | null>(null);

  const userFarms = useMemo(() => {
    if (!user) return [];
    if (user.role === 'ADMIN') return allFarms;
    return allFarms.filter(farm => user.farmIds.includes(farm._id));
  }, [user, allFarms]);

  useEffect(() => {
    if (user) {
      const storedFarmId = localStorage.getItem('currentFarm');
      const farmToSet = userFarms.find(f => f._id === storedFarmId) || userFarms[0] || null;
      setCurrentFarm(farmToSet);
      if (farmToSet) {
        localStorage.setItem('currentFarm', farmToSet._id);
      }
    } else {
      setCurrentFarm(null);
    }
  }, [user, userFarms]);

  const selectFarm = (farmId: string) => {
    const newFarm = userFarms.find(f => f._id === farmId);
    if (newFarm) {
      setCurrentFarm(newFarm);
      localStorage.setItem('currentFarm', newFarm._id);
    }
  };

  return (
    <FarmContext.Provider value={{ currentFarm, userFarms, selectFarm }}>
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
