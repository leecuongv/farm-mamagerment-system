
import React, { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import api from '../services/mockApiService';
import { useFarm } from '../contexts/FarmContext';
import { Animal, InventoryItem, Task, FinancialTransaction } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string; }> = ({ title, value, icon, color }) => (
    <Card className="flex items-center">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div className="mx-5">
            <h4 className="text-2xl font-semibold text-text-primary">{value}</h4>
            <div className="text-text-secondary">{title}</div>
        </div>
    </Card>
);

const DashboardPage: React.FC = () => {
    const { currentFarm } = useFarm();
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);

    useEffect(() => {
        if (currentFarm) {
            api.getAnimals(currentFarm._id).then(setAnimals);
            api.getInventory(currentFarm._id).then(setInventory);
            api.getTasks(currentFarm._id).then(setTasks);
            api.getFinancialTransactions(currentFarm._id).then(setTransactions);
        }
    }, [currentFarm]);

    const lowStockItems = inventory.filter(item => item.quantity < item.lowStockThreshold).length;
    const dueTasks = tasks.filter(task => task.status !== 'DONE' && new Date(task.dueDate) < new Date(Date.now() + 3 * 86400000)).length;
    
    const financeData = transactions.reduce((acc, t) => {
        const month = new Date(t.date).toLocaleString('default', { month: 'short' });
        if (!acc[month]) {
            acc[month] = { name: month, revenue: 0, expense: 0 };
        }
        if (t.type === 'REVENUE') {
            acc[month].revenue += t.amount;
        } else {
            acc[month].expense += t.amount;
        }
        return acc;
    }, {} as Record<string, {name: string, revenue: number, expense: number}>);
    const chartData = Object.values(financeData);
    
    const taskStatusData = tasks.reduce((acc, task) => {
        const status = task.status;
        const existing = acc.find(item => item.name === status);
        if (existing) {
            existing.value++;
        } else {
            acc.push({ name: status, value: 1 });
        }
        return acc;
    }, [] as { name: string, value: number }[]);

    const COLORS = { 'TODO': '#f97316', 'IN_PROGRESS': '#3b82f6', 'DONE': '#22c55e' };

    return (
        <div>
            <h1 className="text-3xl font-semibold text-text-primary">Dashboard</h1>
            <p className="text-text-secondary mb-6">Tổng quan trang trại {currentFarm?.name}</p>

            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <StatCard title="Tổng số vật nuôi" value={animals.length} color="bg-blue-100 text-blue-600" icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14.5,9.5a2,2,0,1,0-2-2A2,2,0,0,0,14.5,9.5ZM14,3H10A5,5,0,0,0,5,8v4a3,3,0,0,0,3,3H8v2a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V15h0a3,3,0,0,0,3-3V8A5,5,0,0,0,14,3Zm5,9a1,1,0,0,1-1,1H15V11a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1Zm-9,1H7a1,1,0,0,1-1-1V11a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1Z"></path></svg>} />
                <StatCard title="Vật phẩm sắp hết" value={lowStockItems} color="bg-red-100 text-red-600" icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>} />
                <StatCard title="Công việc sắp đến hạn" value={dueTasks} color="bg-orange-100 text-orange-600" icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>} />
                <StatCard title="Số chuồng" value={4} color="bg-green-100 text-green-600" icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                    <Card title="Tổng quan tài chính (Doanh thu/Chi phí)">
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis tickFormatter={(value) => new Intl.NumberFormat('vi-VN').format(value as number)}/>
                                    <Tooltip formatter={(value) => new Intl.NumberFormat('vi-VN').format(value as number) + ' VNĐ'} />
                                    <Legend />
                                    <Bar dataKey="revenue" fill="#22c55e" name="Doanh thu" />
                                    <Bar dataKey="expense" fill="#ef4444" name="Chi phí" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card title="Trạng thái công việc">
                         <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={taskStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                        {taskStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
