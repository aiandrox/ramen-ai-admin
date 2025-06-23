import React, { useState } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useMenus, useDeleteMenu } from '../../hooks/useMenus';
import { Layout } from '../../components/layout/Layout';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { MenuForm } from '../../components/forms/MenuForm';
import { Menu, MenuInput } from '../../types/menu';

export const MenusPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
  
  const { data: menus = [], isLoading, error } = useMenus();
  const deleteMenuMutation = useDeleteMenu();

  const handleDelete = async (menu: Menu) => {
    if (!window.confirm(`「${menu.name}」を削除しますか？`)) {
      return;
    }

    try {
      await deleteMenuMutation.mutateAsync(menu.id);
      toast.success('メニューを削除しました');
    } catch (error: any) {
      toast.error('削除に失敗しました');
    }
  };

  const handleCreateSubmit = async (data: MenuInput) => {
    // This will be implemented with the create mutation
    console.log('Create menu:', data);
    setShowCreateModal(false);
  };

  const handleUpdateSubmit = async (data: MenuInput) => {
    // This will be implemented with the update mutation
    console.log('Update menu:', editingMenu?.id, data);
    setEditingMenu(null);
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
          <h1 className="text-2xl font-bold text-gray-900">メニュー管理</h1>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            新規メニュー作成
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">読み込み中...</div>
        ) : (
          <div className="bg-white shadow rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>画像</TableHead>
                  <TableHead>メニュー名</TableHead>
                  <TableHead>店舗</TableHead>
                  <TableHead>ジャンル</TableHead>
                  <TableHead>麺</TableHead>
                  <TableHead>スープ</TableHead>
                  <TableHead>作成日時</TableHead>
                  <TableHead>アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menus.map((menu) => (
                  <TableRow key={menu.id}>
                    <TableCell>
                      {menu.image_url ? (
                        <img
                          src={menu.image_url}
                          alt={menu.name}
                          className="h-12 w-12 object-cover rounded-md"
                        />
                      ) : (
                        <div className="h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{menu.name}</TableCell>
                    <TableCell>{menu.shop.name}</TableCell>
                    <TableCell>{menu.genre.name}</TableCell>
                    <TableCell>{menu.noodle.name}</TableCell>
                    <TableCell>{menu.soup.name}</TableCell>
                    <TableCell>
                      {new Date(menu.created_at).toLocaleDateString('ja-JP')}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingMenu(menu)}
                          className="text-indigo-600 hover:text-indigo-800"
                          title="編集"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(menu)}
                          className="text-red-600 hover:text-red-800"
                          title="削除"
                          disabled={deleteMenuMutation.isPending}
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
          title="新規メニュー作成"
          size="lg"
        >
          <MenuForm
            onSubmit={handleCreateSubmit}
            onCancel={() => setShowCreateModal(false)}
          />
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={!!editingMenu}
          onClose={() => setEditingMenu(null)}
          title="メニュー編集"
          size="lg"
        >
          {editingMenu && (
            <MenuForm
              menu={editingMenu}
              onSubmit={handleUpdateSubmit}
              onCancel={() => setEditingMenu(null)}
            />
          )}
        </Modal>
      </div>
    </Layout>
  );
};