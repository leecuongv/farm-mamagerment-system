
import React from 'react';
import Card from '../components/ui/Card';

const TasksPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-text-primary mb-6">Quản lý Công việc</h1>
       <Card>
        <p className="text-text-secondary">Chức năng quản lý, giao việc và theo dõi tiến độ công việc sẽ được triển khai ở đây.</p>
      </Card>
    </div>
  );
};

export default TasksPage;
