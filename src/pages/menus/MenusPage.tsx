import React, { useState, useMemo } from "react";
import { Plus, Edit, Trash2, Image as ImageIcon, Search, X } from "lucide-react";
import toast from "react-hot-toast";
import { useMenus, useCreateMenu, useUpdateMenu, useDeleteMenu, useGenres, useSoups, useNoodles } from "../../hooks/useMenus";
import { Layout } from "../../components/layout/Layout";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/Table";
import { MenuForm } from "../../components/forms/MenuForm";
import { Menu, MenuInput } from "../../types/menu";

export const MenusPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [selectedSoup, setSelectedSoup] = useState<number | null>(null);
  const [selectedNoodle, setSelectedNoodle] = useState<number | null>(null);

  const { data: menus = [], isLoading, error } = useMenus();
  const { data: genres = [] } = useGenres();
  const { data: soups = [] } = useSoups();
  const { data: noodles = [] } = useNoodles();
  const createMenuMutation = useCreateMenu();
  const updateMenuMutation = useUpdateMenu();
  const deleteMenuMutation = useDeleteMenu();

  // 検索・フィルタリング機能
  const filteredMenus = useMemo(() => {
    let filtered = menus;

    // テキスト検索
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(menu => 
        menu.name.toLowerCase().includes(term) ||
        menu.shop.name.toLowerCase().includes(term)
      );
    }

    // ジャンルフィルター
    if (selectedGenre) {
      filtered = filtered.filter(menu => menu.genre.id === selectedGenre);
    }

    // スープフィルター
    if (selectedSoup) {
      filtered = filtered.filter(menu => menu.soup.id === selectedSoup);
    }

    // 麺フィルター
    if (selectedNoodle) {
      filtered = filtered.filter(menu => menu.noodle.id === selectedNoodle);
    }

    return filtered;
  }, [menus, searchTerm, selectedGenre, selectedSoup, selectedNoodle]);

  // フィルターをクリアする関数
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedGenre(null);
    setSelectedSoup(null);
    setSelectedNoodle(null);
  };

  // アクティブなフィルター数をカウント
  const activeFiltersCount = [searchTerm, selectedGenre, selectedSoup, selectedNoodle].filter(Boolean).length;

  const handleDelete = async (menu: Menu) => {
    if (!window.confirm(`「${menu.name}」を削除しますか？`)) {
      return;
    }

    try {
      await deleteMenuMutation.mutateAsync(menu.id);
      toast.success("メニューを削除しました");
    } catch (error: any) {
      toast.error("削除に失敗しました");
    }
  };

  const handleCreateSubmit = async (data: MenuInput) => {
    try {
      await createMenuMutation.mutateAsync(data);
      toast.success('メニューを作成しました');
      setShowCreateModal(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || '作成に失敗しました');
    }
  };

  const handleUpdateSubmit = async (data: MenuInput) => {
    if (!editingMenu) return;
    
    try {
      await updateMenuMutation.mutateAsync({ id: editingMenu.id, data });
      toast.success('メニューを更新しました');
      setEditingMenu(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || '更新に失敗しました');
    }
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
          <Button 
            onClick={() => setShowCreateModal(true)}
            disabled={createMenuMutation.isPending}
          >
            <Plus className="h-4 w-4 mr-2" />
            新規メニュー作成
          </Button>
        </div>

        {/* 検索・フィルターバー */}
        <div className="space-y-4">
          {/* テキスト検索 */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="メニュー名、店舗名で検索..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <X className="h-4 w-4 mr-1" />
                  フィルタークリア
                </button>
              )}
              <div className="text-sm text-gray-500">
                {filteredMenus.length} 件 / {menus.length} 件中
              </div>
            </div>
          </div>

          {/* セレクトフィルター */}
          <div className="flex items-center space-x-4">
            {/* ジャンルフィルター */}
            <div className="w-48">
              <select
                value={selectedGenre || ""}
                onChange={(e) => setSelectedGenre(e.target.value ? Number(e.target.value) : null)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">すべてのジャンル</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            {/* スープフィルター */}
            <div className="w-48">
              <select
                value={selectedSoup || ""}
                onChange={(e) => setSelectedSoup(e.target.value ? Number(e.target.value) : null)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">すべてのスープ</option>
                {soups.map((soup) => (
                  <option key={soup.id} value={soup.id}>
                    {soup.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 麺フィルター */}
            <div className="w-48">
              <select
                value={selectedNoodle || ""}
                onChange={(e) => setSelectedNoodle(e.target.value ? Number(e.target.value) : null)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">すべての麺</option>
                {noodles.map((noodle) => (
                  <option key={noodle.id} value={noodle.id}>
                    {noodle.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">読み込み中...</div>
        ) : (
          <div className="bg-white shadow rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-96">ID</TableHead>
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
                {filteredMenus.map((menu) => (
                  <TableRow key={menu.id}>
                    <TableCell className="font-mono text-sm text-gray-500">{menu.id}</TableCell>
                    <TableCell>
                      {menu.image_url ? (
                        <button
                          onClick={() => window.open(menu.image_url, "_blank")}
                          className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md"
                          title="画像を拡大表示"
                        >
                          <img
                            src={menu.image_url}
                            alt={menu.name}
                            className="object-cover rounded-md cursor-pointer"
                          />
                        </button>
                      ) : (
                        <div className="h-20 w-20 bg-gray-200 rounded-md flex items-center justify-center">
                          <ImageIcon className="h-10 w-10 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{menu.name}</TableCell>
                    <TableCell>{menu.shop.name}</TableCell>
                    <TableCell>{menu.genre.name}</TableCell>
                    <TableCell>{menu.noodle.name}</TableCell>
                    <TableCell>{menu.soup.name}</TableCell>
                    <TableCell>{new Date(menu.created_at).toLocaleDateString("ja-JP")}</TableCell>
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
            
            {filteredMenus.length === 0 && activeFiltersCount > 0 && (
              <div className="text-center py-8 text-gray-500">
                指定された条件に一致するメニューが見つかりません
              </div>
            )}
            
            {filteredMenus.length === 0 && activeFiltersCount === 0 && menus.length > 0 && (
              <div className="text-center py-8 text-gray-500">
                メニューが登録されていません
              </div>
            )}
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
            loading={createMenuMutation.isPending}
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
              loading={updateMenuMutation.isPending}
            />
          )}
        </Modal>
      </div>
    </Layout>
  );
};
