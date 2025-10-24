
import React from 'react';
import Card from '../components/ui/Card';

const FinancePage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-text-primary mb-6">Quản lý Tài chính</h1>
       <Card>
        <p className="text-text-secondary">Chức năng ghi nhận chi phí, doanh thu và xem báo cáo P&L sẽ được triển khai ở đây.</p>
      </Card>
    </div>
  );
};

export default FinancePage;
