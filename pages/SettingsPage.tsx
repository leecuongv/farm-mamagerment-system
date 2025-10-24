
import React from 'react';
import Card from '../components/ui/Card';

const SettingsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-text-primary mb-6">Cài đặt</h1>
       <Card>
        <p className="text-text-secondary">Người dùng có thể thay đổi mật khẩu và các thông tin cá nhân khác tại đây.</p>
      </Card>
    </div>
  );
};

export default SettingsPage;
