import React from 'react';
import './Dashboard.css';

const DashboardPage = () => {
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-header">Dashboard</h1>
            <div className="dashboard-grid">
                {/* Summary Cards */}
                <div className="card summary-card">
                    <h2>Total Animals</h2>
                    <p>150</p>
                </div>
                <div className="card summary-card">
                    <h2>Tasks Due Today</h2>
                    <p>5</p>
                </div>
                <div className="card summary-card">
                    <h2>Low Stock Items</h2>
                    <p>3</p>
                </div>
                <div className="card summary-card">
                    <h2>Revenue (This Month)</h2>
                    <p>$12,500</p>
                </div>

                {/* Charts */}
                <div className="card chart-card">
                    <h2>Financial Overview</h2>
                    {/* Chart component will go here */}
                </div>
                <div className="card chart-card">
                    <h2>Livestock Growth Rate</h2>
                    {/* Chart component will go here */}
                </div>

                {/* Recent Activity */}
                <div className="card activity-card">
                    <h2>Recent Activity</h2>
                    <ul>
                        <li>User 'staff_A' logged feeding for Enclosure A-01.</li>
                        <li>New animal 'PIG-005' added to the farm.</li>
                        <li>Task 'Repair fence' marked as complete.</li>
                        <li>Inventory item 'Vaccine XYZ' is low on stock.</li>
                    </ul>
                </div>

                 {/* Quick Actions */}
                 <div className="card actions-card">
                    <h2>Quick Actions</h2>
                    <button>Add New Animal</button>
                    <button>Create Task</button>
                    <button>Log Expense</button>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
