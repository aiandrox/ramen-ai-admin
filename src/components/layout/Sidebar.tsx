import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Store, UtensilsCrossed, Home, Database, Tag, Soup, WheatIcon } from 'lucide-react';

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

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const renderNavItem = (item: typeof navigation[0]) => {
    const isActive = location.pathname === item.href;
    return (
      <Link
        key={item.name}
        to={item.href}
        className={`
          group flex items-center px-2 py-2 text-sm font-medium rounded-md
          ${isActive
            ? 'bg-gray-900 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }
        `}
      >
        <item.icon
          className={`
            mr-3 flex-shrink-0 h-6 w-6
            ${isActive ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'}
          `}
        />
        {item.name}
      </Link>
    );
  };

  return (
    <div className="flex flex-col w-64 bg-gray-800">
      <div className="flex flex-col h-0 flex-1 pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {/* メイン機能 */}
          <div className="space-y-1">
            {navigation.map(renderNavItem)}
          </div>

          {/* マスターデータセクション */}
          <div className="pt-6">
            <div className="flex items-center px-2 py-2">
              <Database className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400" />
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                マスターデータ
              </h3>
            </div>
            <div className="space-y-1">
              {masterDataNavigation.map(renderNavItem)}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};