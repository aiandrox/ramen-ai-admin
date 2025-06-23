import React from 'react';
import { useNoodles } from '../../hooks/useMenus';
import { Layout } from '../../components/layout/Layout';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';

export const NoodlesPage: React.FC = () => {
  const { data: noodles = [], isLoading, error } = useNoodles();

  if (error) {
    return (
      <Layout>
        <div className="text-center">
          <p className="text-red-600">エラーが発生しました</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">麺一覧</h1>
          <div className="text-sm text-gray-500">
            {noodles.length} 件の麺
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">読み込み中...</div>
        ) : (
          <div className="bg-white shadow rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>麺名</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {noodles.map((noodle) => (
                  <TableRow key={noodle.id}>
                    <TableCell className="font-mono text-sm text-gray-500">
                      {noodle.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {noodle.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {noodles.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                麺が登録されていません
              </div>
            )}
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>マスターデータについて:</strong> 麺データは読み取り専用です。データの追加・編集はバックエンドのシードファイルまたは管理者権限で行ってください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};