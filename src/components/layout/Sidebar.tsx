import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Store, UtensilsCrossed, Home, Tag, Soup, WheatIcon } from 'lucide-react';

const navigation = [
  { name: 'ダッシュボード', href: '/', icon: Home },
  { name: '店舗管理', href: '/shops', icon: Store },
  { name: 'メニュー管理', href: '/menus', icon: UtensilsCrossed },
];

const masterDataNavigation = [
  { name: 'ジャンル', href: '/master/genres', icon: Tag },
  { name: 'スープ', href: '/master/soups', icon: Soup },
  { name: '麺', href: '/master/noodles', icon: WheatIcon },
];

interface SidebarProps {
  closeSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
  const location = useLocation();

  const renderNavItem = (item: typeof navigation[0]) => {
    return (
      <Link
        key={item.name}
        to={item.href}
        className={`flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-md ${
          location.pathname === item.href ? 'bg-gray-200' : ''
        }`}
      >
        <item.icon className="w-5 h-5 mr-3" />
        {item.name}
      </Link>
    );
  };

  return (
    <div className="w-64 bg-white shadow-md h-full flex flex-col">
      <button
        onClick={closeSidebar}
        className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none self-end"
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map(renderNavItem)}
        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            マスターデータ
          </h3>
          <div className="mt-1 space-y-1">
            {masterDataNavigation.map(renderNavItem)}
          </div>
        </div>
      </nav>
    </div>
  );
};