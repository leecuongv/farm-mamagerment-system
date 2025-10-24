
export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  STAFF = 'STAFF',
}

export interface User {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  role: Role;
  farmIds: string[];
  isActive: boolean;
  createdAt: string;
}

export interface Farm {
  _id: string;
  name: string;
  location: string;
  createdAt: string;
}

export interface Animal {
  _id: string;
  farmId: string;
  tagId: string;
  species: string;
  animalType: string;
  birthDate: string;
  status: 'HEALTHY' | 'SICK' | 'SOLD' | 'DEAD';
  enclosureId: string;
  [key: string]: any; // for other properties
}

export interface Enclosure {
  _id: string;
  farmId: string;
  name: string;
  type: string;
  capacity: number;
  currentOccupancy: number;
}

export interface InventoryItem {
  _id: string;
  farmId: string;
  name: string;
  category: 'FEED' | 'MEDICINE' | 'FERTILIZER' | 'SEED';
  quantity: number;
  unit: string;
  lowStockThreshold: number;
}

export interface Task {
  _id: string;
  farmId: string;
  title: string;
  assignedTo: string; // user id
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  dueDate: string;
}

export interface FinancialTransaction {
  _id: string;
  farmId: string;
  type: 'EXPENSE' | 'REVENUE';
  amount: number;
  description: string;
  category: string;
  date: string;
}
