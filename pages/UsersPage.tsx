
import React, { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import api from '../services/mockApiService';
import { User } from '../types';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // In a real app, this would be a protected API call
    api.getUsers().then(setUsers);
  }, []);

  const handleToggleActive = (userId: string) => {
      setUsers(users.map(u => u._id === userId ? {...u, isActive: !u.isActive} : u))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-text-primary">Quản lý Người dùng</h1>
        <button className="px-4 py-2 font-semibold text-white bg-primary rounded-md hover:bg-primary-dark">
          Tạo người dùng
        </button>
      </div>
      <Card>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b">
                        <th className="py-3 px-4 text-text-secondary font-semibold">Họ tên</th>
                        <th className="py-3 px-4 text-text-secondary font-semibold">Email</th>
                        <th className="py-3 px-4 text-text-secondary font-semibold">Vai trò</th>
                        <th className="py-3 px-4 text-text-secondary font-semibold">Trạng thái</th>
                        <th className="py-3 px-4 text-text-secondary font-semibold">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 text-text-primary">{user.fullName}</td>
                            <td className="py-3 px-4 text-text-secondary">{user.email}</td>
                            <td className="py-3 px-4 text-text-secondary">{user.role}</td>
                            <td className="py-3 px-4">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {user.isActive ? 'Đang hoạt động' : 'Vô hiệu hóa'}
                                </span>
                            </td>
                            <td className="py-3 px-4">
                                <button onClick={() => handleToggleActive(user._id)} className={`px-3 py-1 text-sm font-medium rounded-md ${user.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}>
                                    {user.isActive ? 'Vô hiệu hóa' : 'Kích hoạt'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
};

export default UsersPage;
