
import React, { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import api from '../services/mockApiService';
import { Farm } from '../types';

const FarmsPage: React.FC = () => {
    const [farms, setFarms] = useState<Farm[]>([]);

    useEffect(() => {
        api.getFarms().then(setFarms);
    }, []);

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-text-primary">Quản lý Trang trại</h1>
            <button className="px-4 py-2 font-semibold text-white bg-primary rounded-md hover:bg-primary-dark">
                Tạo trang trại
            </button>
        </div>
      <Card>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b">
                        <th className="py-3 px-4 text-text-secondary font-semibold">Tên trang trại</th>
                        <th className="py-3 px-4 text-text-secondary font-semibold">Địa điểm</th>
                        <th className="py-3 px-4 text-text-secondary font-semibold">Ngày tạo</th>
                        <th className="py-3 px-4 text-text-secondary font-semibold">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {farms.map(farm => (
                        <tr key={farm._id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 text-text-primary">{farm.name}</td>
                            <td className="py-3 px-4 text-text-secondary">{farm.location}</td>
                            <td className="py-3 px-4 text-text-secondary">{new Date(farm.createdAt).toLocaleDateString()}</td>
                            <td className="py-3 px-4">
                                <button className="text-sm font-medium text-primary hover:underline">Sửa</button>
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

export default FarmsPage;
