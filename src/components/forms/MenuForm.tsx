import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { SearchableSelect } from '../ui/SearchableSelect';
import { Menu, MenuInput } from '../../types/menu';
import { useShops } from '../../hooks/useShops';
import { useGenres, useSoups, useNoodles } from '../../hooks/useMenus';

const schema = yup.object({
  name: yup.string().required('メニュー名は必須です'),
  shop_id: yup.number().required('店舗は必須です'),
  genre_id: yup.number().required('ジャンルは必須です'),
  soup_id: yup.number().required('スープは必須です'),
  noodle_id: yup.number().required('麺は必須です'),
});

interface MenuFormProps {
  menu?: Menu;
  onSubmit: (data: MenuInput) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const MenuForm: React.FC<MenuFormProps> = ({
  menu,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  
  const { data: shops = [] } = useShops();
  const { data: genres = [] } = useGenres();
  const { data: soups = [] } = useSoups();
  const { data: noodles = [] } = useNoodles();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Omit<MenuInput, 'image'>>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: menu ? {
      name: menu.name,
      shop_id: menu.shop.id,
      genre_id: menu.genre.id,
      soup_id: menu.soup.id,
      noodle_id: menu.noodle.id,
    } : undefined,
  });

  const handleFormSubmit = async (data: Omit<MenuInput, 'image'>) => {
    const formData: MenuInput = {
      ...data,
      ...(selectedImage && { image: selectedImage }),
    };
    await onSubmit(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        {...register('name')}
        label="メニュー名"
        error={errors.name?.message}
        placeholder="メニュー名を入力してください"
      />

      <SearchableSelect
        label="店舗"
        options={shops}
        value={watch('shop_id')}
        onChange={(value) => setValue('shop_id', value as number)}
        placeholder="店舗を選択してください"
        error={errors.shop_id?.message}
      />

      <SearchableSelect
        label="ジャンル"
        options={genres}
        value={watch('genre_id')}
        onChange={(value) => setValue('genre_id', value as number)}
        placeholder="ジャンルを選択してください"
        error={errors.genre_id?.message}
      />

      <SearchableSelect
        label="スープ"
        options={soups}
        value={watch('soup_id')}
        onChange={(value) => setValue('soup_id', value as number)}
        placeholder="スープを選択してください"
        error={errors.soup_id?.message}
      />

      <SearchableSelect
        label="麺"
        options={noodles}
        value={watch('noodle_id')}
        onChange={(value) => setValue('noodle_id', value as number)}
        placeholder="麺を選択してください"
        error={errors.noodle_id?.message}
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">画像</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
        {selectedImage && (
          <p className="text-sm text-gray-600">選択されたファイル: {selectedImage.name}</p>
        )}
        {menu?.image_url && !selectedImage && (
          <div className="mt-2">
            <img
              src={menu.image_url}
              alt={menu.name}
              className="h-20 w-20 object-cover rounded-md"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          キャンセル
        </Button>
        <Button
          type="submit"
          loading={loading}
        >
          {menu ? '更新' : '作成'}
        </Button>
      </div>
    </form>
  );
};