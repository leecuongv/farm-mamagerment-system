
import React from 'react';
import Card from '../components/ui/Card';

const InventoryPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-text-primary mb-6">Quản lý Kho</h1>
       <Card>
        <p className="text-text-secondary">Chức năng quản lý vật tư, xuất/nhập kho, và kiểm kê sẽ được triển khai ở đây.</p>
      </Card>
    </div>
  );
};

export default InventoryPage;
