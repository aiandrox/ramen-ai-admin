import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Image as ImageIcon } from 'lucide-react';
import { useUserMenuReports } from '../../hooks/useUserMenuReports';
import { Layout } from '../../components/layout/Layout';

export const UserMenuReportsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { data: reports = [], isLoading, error } = useUserMenuReports(Number(userId));

  const user = reports[0]?.user;

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
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/users')}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">投稿一覧</h1>
            {user && (
              <p className="text-sm text-gray-500 mt-0.5">
                {user.name}（{user.email}）
              </p>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">読み込み中...</div>
        ) : reports.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center text-gray-500">
            投稿がありません
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">{reports.length} 件</p>
            {reports.map((report) => (
              <div key={report.id} className="bg-white shadow rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    {/* メニュー・店舗情報 */}
                    <div>
                      <span className="text-lg font-semibold text-gray-900">
                        {report.menu.name}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        {report.menu.shop.name}
                      </span>
                    </div>

                    {/* タグ */}
                    <div className="flex flex-wrap gap-2">
                      {report.genre && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {report.genre.name}
                        </span>
                      )}
                      {report.soup && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                          {report.soup.name}
                        </span>
                      )}
                      {report.noodle && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          {report.noodle.name}
                        </span>
                      )}
                    </div>

                    {/* レビュー */}
                    {report.menu.reviews.length > 0 && (
                      <div className="space-y-2 pt-1">
                        {report.menu.reviews.map((review) => (
                          <div key={review.id} className="bg-gray-50 rounded-md p-3">
                            <div className="flex items-center space-x-2 mb-1">
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3.5 w-3.5 ${
                                      i < review.rating
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">{review.visited_at}</span>
                            </div>
                            <p className="text-sm text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 画像 */}
                  <div className="ml-4 flex-shrink-0">
                    {report.image_urls.length > 0 ? (
                      <div className="flex space-x-1">
                        {report.image_urls.slice(0, 3).map((url, i) => (
                          <button
                            key={i}
                            onClick={() => window.open(url, '_blank')}
                            className="hover:opacity-80 transition-opacity"
                          >
                            <img
                              src={url}
                              alt={`${report.menu.name} ${i + 1}`}
                              className="h-16 w-16 object-cover rounded-md"
                            />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-gray-300" />
                      </div>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-xs text-gray-400">
                  投稿日: {new Date(report.created_at).toLocaleDateString('ja-JP')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};
