import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useFarm } from '../context/FarmContext';

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const { selectedFarm, farms, selectFarm } = useFarm();

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome, {user?.fullName}!</p>
            {farms.length > 1 && (
                <div>
                    <label>Select Farm: </label>
                    <select 
                        value={selectedFarm?.id || ''} 
                        onChange={(e) => {
                            const farm = farms.find(f => f.id === e.target.value);
                            if(farm) selectFarm(farm);
                        }}
                    >
                        {farms.map(farm => (
                            <option key={farm.id} value={farm.id}>{farm.name}</option>
                        ))}
                    </select>
                </div>
            )}
            {selectedFarm && <p>Current Farm: {selectedFarm.name}</p>}
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default DashboardPage;
