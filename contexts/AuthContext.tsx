
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { User, Role } from '../types';
import { getMockUsers } from '../services/mockApiService';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers = getMockUsers();
const adminUser = mockUsers.find(u => u.role === Role.ADMIN)!;
const managerUser = mockUsers.find(u => u.role === Role.MANAGER)!;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem('farmUser');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      return null;
    }
  });

  const login = useCallback(async (email: string, pass: string): Promise<boolean> => {
    console.log(`Attempting login for ${email}`);
    // This is a mock login. In a real app, you'd call an API.
    // For demo, let's allow login as admin or manager.
    let foundUser: User | undefined;
    if (email.toLowerCase().includes('admin')) {
      foundUser = adminUser;
    } else if (email.toLowerCase().includes('manager')) {
      foundUser = managerUser;
    }

    if (foundUser && foundUser.isActive) {
      setUser(foundUser);
      localStorage.setItem('farmUser', JSON.stringify(foundUser));
      return true;
    }
    // Simulate "not activated" error
    if (foundUser && !foundUser.isActive) {
      alert("Tài khoản chưa được kích hoạt.");
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('farmUser');
    localStorage.removeItem('currentFarm');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
