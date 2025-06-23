import React from 'react';
import { Store, UtensilsCrossed, Users } from 'lucide-react';
import { useShops } from '../hooks/useShops';
import { useMenus } from '../hooks/useMenus';
import { Layout } from '../components/layout/Layout';

export const DashboardPage: React.FC = () => {
  const { data: shops = [] } = useShops();
  const { data: menus = [] } = useMenus();

  const stats = [
    {
      name: '店舗数',
      value: shops.length,
      icon: Store,
      color: 'bg-blue-500',
    },
    {
      name: 'メニュー数',
      value: menus.length,
      icon: UtensilsCrossed,
      color: 'bg-green-500',
    },
    {
      name: '管理者数',
      value: 1,
      icon: Users,
      color: 'bg-purple-500',
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${stat.color} rounded-md p-3`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-3xl font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">概要</h2>
          <p className="text-gray-600">
            ラーメンAI管理画面へようこそ。このダッシュボードから店舗とメニューを管理できます。
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-500">
              • 店舗管理: ラーメン店の情報を追加・編集・削除
            </p>
            <p className="text-sm text-gray-500">
              • メニュー管理: 各店舗のメニュー情報と画像を管理
            </p>
            <p className="text-sm text-gray-500">
              • AI推奨機能: ユーザーの好みに基づいてメニューを推奨
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};