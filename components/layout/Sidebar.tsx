
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Role } from '../../types';

const DashboardIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>;
const LivestockIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14.5,9.5a2,2,0,1,0-2-2A2,2,0,0,0,14.5,9.5ZM14,3H10A5,5,0,0,0,5,8v4a3,3,0,0,0,3,3H8v2a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V15h0a3,3,0,0,0,3-3V8A5,5,0,0,0,14,3Zm5,9a1,1,0,0,1-1,1H15V11a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1Zm-9,1H7a1,1,0,0,1-1-1V11a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1Z"></path></svg>;
const InventoryIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>;
const TasksIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>;
const FinanceIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>;
const UsersIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.975 5.975 0 0112 13a5.975 5.975 0 013 5.197M15 21a6 6 0 00-9-5.197"></path></svg>;
const FarmsIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>;

const navLinkClasses = "flex items-center mt-4 py-2 px-6 text-gray-100";
const activeLinkClasses = "bg-gray-700 bg-opacity-25 border-l-4 border-primary";
const inactiveLinkClasses = "hover:bg-gray-700 hover:bg-opacity-25";

const NavItem: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => (
    <NavLink to={to} className={({isActive}) => `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>
        {icon}
        <span className="mx-3">{label}</span>
    </NavLink>
);

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const { user } = useAuth();
    
    return (
        <>
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)}></div>
            <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-200 ease-in-out z-30`}>
                <div className="flex items-center justify-center mt-8">
                    <div className="flex items-center">
                        <span className="text-white text-2xl mx-2 font-semibold">FarmSys</span>
                    </div>
                </div>
                <nav className="mt-10">
                    <NavItem to="/" icon={<DashboardIcon />} label="Dashboard" />
                    {(user?.role === Role.ADMIN || user?.role === Role.MANAGER) && <NavItem to="/livestock" icon={<LivestockIcon />} label="Vật nuôi" />}
                    <NavItem to="/inventory" icon={<InventoryIcon />} label="Kho" />
                    <NavItem to="/tasks" icon={<TasksIcon />} label="Công việc" />
                    {(user?.role === Role.ADMIN || user?.role === Role.MANAGER) && <NavItem to="/finance" icon={<FinanceIcon />} label="Tài chính" />}
                    
                    {user?.role === Role.ADMIN && (
                        <>
                            <hr className="my-6 border-gray-600" />
                            <NavItem to="/users" icon={<UsersIcon />} label="Người dùng" />
                            <NavItem to="/farms" icon={<FarmsIcon />} label="Trang trại" />
                        </>
                    )}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
