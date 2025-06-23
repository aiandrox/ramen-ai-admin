import React, { useState, useMemo } from 'react';
import { Plus, Edit, Trash2, ExternalLink, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { useShops, useDeleteShop } from '../../hooks/useShops';
import { Layout } from '../../components/layout/Layout';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { ShopForm } from '../../components/forms/ShopForm';
import { Shop, ShopInput } from '../../types/shop';

export const ShopsPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingShop, setEditingShop] = useState<Shop | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: shops = [], isLoading, error } = useShops();
  const deleteShopMutation = useDeleteShop();

  // 検索機能
  const filteredShops = useMemo(() => {
    if (!searchTerm) return shops;
    
    const term = searchTerm.toLowerCase();
    return shops.filter(shop => 
      shop.name.toLowerCase().includes(term) ||
      shop.address.toLowerCase().includes(term)
    );
  }, [shops, searchTerm]);

  const handleDelete = async (shop: Shop) => {
    if (!window.confirm(`「${shop.name}」を削除しますか？`)) {
      return;
    }

    try {
      await deleteShopMutation.mutateAsync(shop.id);
      toast.success('店舗を削除しました');
    } catch (error: any) {
      toast.error('削除に失敗しました');
    }
  };

  const handleCreateSubmit = async (data: ShopInput) => {
    // This will be implemented with the create mutation
    console.log('Create shop:', data);
    setShowCreateModal(false);
  };

  const handleUpdateSubmit = async (data: ShopInput) => {
    // This will be implemented with the update mutation
    console.log('Update shop:', editingShop?.id, data);
    setEditingShop(null);
  };

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
          <h1 className="text-2xl font-bold text-gray-900">店舗管理</h1>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            新規店舗作成
          </Button>
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
                placeholder="店舗名、住所で検索..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          {searchTerm && (
            <div className="text-sm text-gray-500">
              {filteredShops.length} 件 / {shops.length} 件中
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-8">読み込み中...</div>
        ) : (
          <div className="bg-white shadow rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>店舗名</TableHead>
                  <TableHead>住所</TableHead>
                  <TableHead>メニュー数</TableHead>
                  <TableHead>作成日時</TableHead>
                  <TableHead>アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShops.map((shop) => (
                  <TableRow key={shop.id}>
                    <TableCell className="font-mono text-sm text-gray-500">
                      {shop.id}
                    </TableCell>
                    <TableCell className="font-medium">{shop.name}</TableCell>
                    <TableCell>{shop.address}</TableCell>
                    <TableCell>{shop.menus?.length || 0}</TableCell>
                    <TableCell>
                      {new Date(shop.created_at).toLocaleDateString('ja-JP')}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => window.open(shop.google_map_url, '_blank')}
                          className="text-blue-600 hover:text-blue-800"
                          title="Google Mapで開く"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setEditingShop(shop)}
                          className="text-indigo-600 hover:text-indigo-800"
                          title="編集"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(shop)}
                          className="text-red-600 hover:text-red-800"
                          title="削除"
                          disabled={deleteShopMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredShops.length === 0 && searchTerm && (
              <div className="text-center py-8 text-gray-500">
                「{searchTerm}」に一致する店舗が見つかりません
              </div>
            )}
            
            {filteredShops.length === 0 && !searchTerm && shops.length > 0 && (
              <div className="text-center py-8 text-gray-500">
                店舗が登録されていません
              </div>
            )}
          </div>
        )}

        {/* Create Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="新規店舗作成"
        >
          <ShopForm
            onSubmit={handleCreateSubmit}
            onCancel={() => setShowCreateModal(false)}
          />
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={!!editingShop}
          onClose={() => setEditingShop(null)}
          title="店舗編集"
        >
          {editingShop && (
            <ShopForm
              shop={editingShop}
              onSubmit={handleUpdateSubmit}
              onCancel={() => setEditingShop(null)}
            />
          )}
        </Modal>
      </div>
    </Layout>
  );
};