import React, { useState, useMemo } from 'react';
import { Search, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/useUsers';
import { Layout } from '../../components/layout/Layout';
import { Pagination } from '../../components/ui/Pagination';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';

export const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const { data: users = [], pagination, isLoading, error } = useUsers(page);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchTerm("");
  };

  // 検索機能（現在ページ内）
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;

    const term = searchTerm.toLowerCase();
    return users.filter(user =>
      user.email.toLowerCase().includes(term) ||
      user.name.toLowerCase().includes(term) ||
      user.provider.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

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
          <h1 className="text-2xl font-bold text-gray-900">ユーザー管理</h1>
        </div>

        {/* 検索バー */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="名前、メールアドレス、プロバイダーで検索..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          {searchTerm && (
            <div className="text-sm text-gray-500">
              {filteredUsers.length} 件 / {users.length} 件中
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-8">読み込み中...</div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>画像</TableHead>
                  <TableHead>名前</TableHead>
                  <TableHead>メールアドレス</TableHead>
                  <TableHead>プロバイダー</TableHead>
                  <TableHead>認証済み</TableHead>
                  <TableHead>登録日時</TableHead>
                  <TableHead>投稿</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-mono text-sm text-gray-500">
                      {user.id}
                    </TableCell>
                    <TableCell>
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs text-gray-500">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.provider === 'google'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.provider}
                      </span>
                    </TableCell>
                    <TableCell>
                      {user.email_verified ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          認証済み
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          未認証
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => navigate(`/users/${user.id}/menu_reports`)}
                        className="text-indigo-600 hover:text-indigo-800"
                        title="投稿一覧"
                      >
                        <FileText className="h-4 w-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredUsers.length === 0 && searchTerm && (
              <div className="text-center py-8 text-gray-500">
                「{searchTerm}」に一致するユーザーが見つかりません
              </div>
            )}

            {filteredUsers.length === 0 && !searchTerm && users.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                ユーザーが登録されていません
              </div>
            )}

            {pagination && !searchTerm && (
              <Pagination pagination={pagination} onPageChange={handlePageChange} />
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};
