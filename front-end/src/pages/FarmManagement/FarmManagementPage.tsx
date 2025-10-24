import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './FarmManagement.css';

interface Farm {
    id: string;
    name: string;
    location: string;
}

const FarmManagementPage = () => {
    const [farms, setFarms] = useState<Farm[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFarms = async () => {
            try {
                const response = await api.get('/farms');
                setFarms(response.data);
            } catch (err) {
                setError('Failed to fetch farms.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFarms();
    }, []);

    if (isLoading) {
        return <div>Loading farms...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="farm-management-container">
            <h1>Farm Management</h1>
            <button className="add-farm-btn">Add New Farm</button>
            <table className="farms-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {farms.map((farm) => (
                        <tr key={farm.id}>
                            <td>{farm.name}</td>
                            <td>{farm.location}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FarmManagementPage;
