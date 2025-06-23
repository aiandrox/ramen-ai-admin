import React, { useState } from 'react';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
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
  
  const { data: shops = [], isLoading, error } = useShops();
  const deleteShopMutation = useDeleteShop();

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

        {isLoading ? (
          <div className="text-center py-8">読み込み中...</div>
        ) : (
          <div className="bg-white shadow rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>店舗名</TableHead>
                  <TableHead>住所</TableHead>
                  <TableHead>メニュー数</TableHead>
                  <TableHead>作成日時</TableHead>
                  <TableHead>アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shops.map((shop) => (
                  <TableRow key={shop.id}>
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