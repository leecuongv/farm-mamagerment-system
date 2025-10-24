import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './UserManagement.css';

interface User {
    id: string;
    fullName: string;
    email: string;
    role: string;
    isActive: boolean;
}

const UserManagementPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users');
                setUsers(response.data);
            } catch (err) {
                setError('Failed to fetch users.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleToggleActivation = async (userId: string, isActive: boolean) => {
        try {
            await api.post(`/users/${userId}/activate`, { isActive: !isActive });
            setUsers(users.map(user => user.id === userId ? { ...user, isActive: !isActive } : user));
        } catch (error) {
            console.error("Failed to update user status", error);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="user-management-container">
            <h1>User Management</h1>
            <button className="add-user-btn">Add New User</button>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <span className={`status ${user.isActive ? 'active' : 'inactive'}`}>
                                    {user.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                            <td>
                                <button onClick={() => handleToggleActivation(user.id, user.isActive)}>
                                    {user.isActive ? 'Deactivate' : 'Activate'}
                                </button>
                                <button>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagementPage;
