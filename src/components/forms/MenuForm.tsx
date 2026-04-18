import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { SearchableSelect } from '../ui/SearchableSelect';
import { Menu, MenuInput, MenuUpdateInput } from '../../types/menu';
import { useShops } from '../../hooks/useShops';
import { useGenres, useSoups, useNoodles } from '../../hooks/useMenus';

const createSchema = yup.object({
  name: yup.string().required('メニュー名は必須です'),
  shop_id: yup.number().required('店舗は必須です'),
});

const updateSchema = yup.object({
  name: yup.string(),
  genre_id: yup.number(),
});

interface MenuFormCreateProps {
  menu?: undefined;
  onSubmit: (data: MenuInput) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

interface MenuFormUpdateProps {
  menu: Menu;
  onSubmit: (data: MenuUpdateInput) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

type MenuFormProps = MenuFormCreateProps | MenuFormUpdateProps;

export const MenuForm: React.FC<MenuFormProps> = ({
  menu,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const isEditing = !!menu;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { data: shops = [] } = useShops();
  const { data: genres = [] } = useGenres();
  const { data: soups = [] } = useSoups();
  const { data: noodles = [] } = useNoodles();

  const createForm = useForm<Omit<MenuInput, 'image'>>({
    resolver: yupResolver(createSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const updateForm = useForm<MenuUpdateInput>({
    resolver: yupResolver(updateSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: menu ? {
      name: menu.name,
      genre_id: menu.genre?.id,
    } : undefined,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedImage(file);
  };

  if (isEditing) {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = updateForm;
    return (
      <form onSubmit={handleSubmit(onSubmit as (data: MenuUpdateInput) => Promise<void>)} className="space-y-4">
        <Input
          {...register('name')}
          label="メニュー名"
          error={errors.name?.message}
          placeholder="メニュー名を入力してください"
        />
        <SearchableSelect
          label="ジャンル"
          options={genres}
          value={watch('genre_id')}
          onChange={(value) => setValue('genre_id', value as number)}
          placeholder="ジャンルを選択してください"
          error={errors.genre_id?.message}
        />
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
            キャンセル
          </Button>
          <Button type="submit" loading={loading}>
            更新
          </Button>
        </div>
      </form>
    );
  }

  const { register, handleSubmit, setValue, watch, formState: { errors } } = createForm;
  const handleFormSubmit = async (data: Omit<MenuInput, 'image'>) => {
    if (!selectedImage) return;
    await (onSubmit as (data: MenuInput) => Promise<void>)({ ...data, image: selectedImage });
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
        label="ジャンル（任意）"
        options={genres}
        value={watch('genre_id')}
        onChange={(value) => setValue('genre_id', value as number)}
        placeholder="ジャンルを選択してください"
      />

      <SearchableSelect
        label="スープ（任意）"
        options={soups}
        value={watch('soup_id')}
        onChange={(value) => setValue('soup_id', value as number)}
        placeholder="スープを選択してください"
      />

      <SearchableSelect
        label="麺（任意）"
        options={noodles}
        value={watch('noodle_id')}
        onChange={(value) => setValue('noodle_id', value as number)}
        placeholder="麺を選択してください"
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
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          キャンセル
        </Button>
        <Button type="submit" loading={loading} disabled={!selectedImage}>
          作成
        </Button>
      </div>
    </form>
  );
};
