
import { User, Role, Farm, Animal, Enclosure, InventoryItem, Task, FinancialTransaction } from '../types';

const FARMS: Farm[] = [
  { _id: 'farm_dalat', name: 'Trang trại Đà Lạt', location: 'Lâm Đồng', createdAt: new Date().toISOString() },
  { _id: 'farm_hanoi', name: 'Trang trại Hà Nội', location: 'Hà Nội', createdAt: new Date().toISOString() },
];

const USERS: User[] = [
  { _id: 'user_admin', username: 'admin', email: 'admin@farm.com', fullName: 'Quản trị viên Hệ thống', role: Role.ADMIN, farmIds: [], isActive: true, createdAt: new Date().toISOString() },
  { _id: 'user_manager_dalat', username: 'manager_dalat', email: 'manager@farm.com', fullName: 'Quản lý Farm Đà Lạt', role: Role.MANAGER, farmIds: ['farm_dalat'], isActive: true, createdAt: new Date().toISOString() },
  { _id: 'user_staff_dalat', username: 'staff_dalat', email: 'staff@farm.com', fullName: 'Nhân viên Đà Lạt', role: Role.STAFF, farmIds: ['farm_dalat'], isActive: true, createdAt: new Date().toISOString() },
  { _id: 'user_inactive', username: 'inactive_user', email: 'inactive@farm.com', fullName: 'Người dùng Vô hiệu hóa', role: Role.STAFF, farmIds: ['farm_hanoi'], isActive: false, createdAt: new Date().toISOString() },
];

const ANIMALS: Animal[] = [
    { _id: 'animal1', farmId: 'farm_dalat', tagId: 'PIG-001', species: 'Lợn', animalType: 'BREEDING_FEMALE', birthDate: '2023-01-15T00:00:00Z', status: 'HEALTHY', enclosureId: 'enc1' },
    { _id: 'animal2', farmId: 'farm_dalat', tagId: 'PIG-002', species: 'Lợn', animalType: 'FATTENING', birthDate: '2023-03-20T00:00:00Z', status: 'HEALTHY', enclosureId: 'enc2' },
    { _id: 'animal3', farmId: 'farm_dalat', tagId: 'COW-001', species: 'Bò', animalType: 'BREEDING_FEMALE', birthDate: '2022-05-10T00:00:00Z', status: 'SICK', enclosureId: 'enc3' },
    { _id: 'animal4', farmId: 'farm_hanoi', tagId: 'CHICK-050', species: 'Gà', animalType: 'YOUNG', birthDate: '2023-08-01T00:00:00Z', status: 'HEALTHY', enclosureId: 'enc4' },
];

const ENCLOSURES: Enclosure[] = [
    { _id: 'enc1', farmId: 'farm_dalat', name: 'Chuồng Nái A-01', type: 'BREEDING_PEN', capacity: 20, currentOccupancy: 15 },
    { _id: 'enc2', farmId: 'farm_dalat', name: 'Chuồng Vỗ béo B-03', type: 'FATTENING_PEN', capacity: 50, currentOccupancy: 48 },
    { _id: 'enc3', farmId: 'farm_dalat', name: 'Khu Bò sữa 1', type: 'DAIRY_PEN', capacity: 30, currentOccupancy: 25 },
    { _id: 'enc4', farmId: 'farm_hanoi', name: 'Khu Gà con', type: 'POULTRY_COOP', capacity: 200, currentOccupancy: 180 },
];

const INVENTORY: InventoryItem[] = [
    { _id: 'inv1', farmId: 'farm_dalat', name: 'Cám con non tập ăn', category: 'FEED', quantity: 150.5, unit: 'kg', lowStockThreshold: 50 },
    { _id: 'inv2', farmId: 'farm_dalat', name: 'Vắc-xin 5 bệnh', category: 'MEDICINE', quantity: 20, unit: 'lọ', lowStockThreshold: 10 },
    { _id: 'inv3', farmId: 'farm_dalat', name: 'Phân bón NPK', category: 'FERTILIZER', quantity: 500, unit: 'kg', lowStockThreshold: 100 },
    { _id: 'inv4', farmId: 'farm_hanoi', name: 'Thức ăn gà', category: 'FEED', quantity: 80, unit: 'kg', lowStockThreshold: 100 },
];

const TASKS: Task[] = [
    { _id: 'task1', farmId: 'farm_dalat', title: 'Cho bò chuồng A1 ăn', assignedTo: 'user_staff_dalat', status: 'TODO', dueDate: new Date(Date.now() + 86400000).toISOString() },
    { _id: 'task2', farmId: 'farm_dalat', title: 'Kiểm tra sức khỏe đàn lợn nái', assignedTo: 'user_manager_dalat', status: 'IN_PROGRESS', dueDate: new Date().toISOString() },
    { _id: 'task3', farmId: 'farm_dalat', title: 'Sửa chữa hàng rào khu B', assignedTo: 'user_staff_dalat', status: 'DONE', dueDate: new Date(Date.now() - 86400000).toISOString() },
];

const TRANSACTIONS: FinancialTransaction[] = [
  {_id: 'ft1', farmId: 'farm_dalat', type: 'EXPENSE', amount: 5000000, description: 'Mua 10 bao cám Bò', category: 'Vật tư', date: '2023-10-01T10:00:00Z'},
  {_id: 'ft2', farmId: 'farm_dalat', type: 'REVENUE', amount: 15000000, description: 'Bán 5 con lợn thịt', category: 'Bán vật nuôi', date: '2023-10-03T14:00:00Z'},
  {_id: 'ft3', farmId: 'farm_dalat', type: 'EXPENSE', amount: 1200000, description: 'Tiền điện tháng 9', category: 'Vận hành', date: '2023-10-05T09:00:00Z'},
   {_id: 'ft4', farmId: 'farm_hanoi', type: 'REVENUE', amount: 8000000, description: 'Bán trứng gà', category: 'Bán sản phẩm', date: '2023-10-06T11:00:00Z'},
];

const api = {
  getFarms: () => Promise.resolve(FARMS),
  getUsers: () => Promise.resolve(USERS),
  getAnimals: (farmId: string) => Promise.resolve(ANIMALS.filter(a => a.farmId === farmId)),
  getEnclosures: (farmId: string) => Promise.resolve(ENCLOSURES.filter(e => e.farmId === farmId)),
  getInventory: (farmId: string) => Promise.resolve(INVENTORY.filter(i => i.farmId === farmId)),
  getTasks: (farmId: string) => Promise.resolve(TASKS.filter(t => t.farmId === farmId)),
  getFinancialTransactions: (farmId: string) => Promise.resolve(TRANSACTIONS.filter(t => t.farmId === farmId)),
};

export const { getFarms: getMockFarms, getUsers: getMockUsers } = {
    getFarms: () => FARMS,
    getUsers: () => USERS
};

export default api;
