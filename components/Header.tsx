'use client';

import { Search, Bell, Settings, User, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '@/lib/slices/authSlice';
import { useState } from 'react';

export default function Header() {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const user = {
    name: 'أحمد علي',
    role: 'مدير المخزون',
    avatar: 'AA',
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      {/* Left Section - Search */}
      <div className="flex items-center gap-2 flex-1">
        <div className="relative w-64">
          <Search size={18} className="absolute right-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن منتج أو عميل..."
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Settings */}
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings size={20} />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {user.avatar}
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20">
              <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm">
                <User size={16} />
                <span>الملف الشخصي</span>
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm">
                <Settings size={16} />
                <span>الإعدادات</span>
              </button>
              <hr className="my-1" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
              >
                <LogOut size={16} />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
