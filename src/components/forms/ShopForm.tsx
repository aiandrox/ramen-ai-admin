import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Shop, ShopInput, ShopUpdateInput } from '../../types/shop';

const createSchema = yup.object({
  google_map_url: yup.string().url('有効なURLを入力してください').required('Google Map URLは必須です'),
  name: yup.string(),
  address: yup.string(),
});

const updateSchema = yup.object({
  name: yup.string().required('店舗名は必須です'),
});

interface ShopFormCreateProps {
  shop?: undefined;
  onSubmit: (data: ShopInput) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

interface ShopFormUpdateProps {
  shop: Shop;
  onSubmit: (data: ShopUpdateInput) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

type ShopFormProps = ShopFormCreateProps | ShopFormUpdateProps;

export const ShopForm: React.FC<ShopFormProps> = ({
  shop,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const isEditing = !!shop;

  const createForm = useForm<ShopInput>({
    resolver: yupResolver(createSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const updateForm = useForm<ShopUpdateInput>({
    resolver: yupResolver(updateSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: shop ? { name: shop.name } : undefined,
  });

  if (isEditing) {
    const { register, handleSubmit, formState: { errors } } = updateForm;
    return (
      <form onSubmit={handleSubmit(onSubmit as (data: ShopUpdateInput) => Promise<void>)} className="space-y-4">
        <Input
          {...register('name')}
          label="店舗名"
          error={errors.name?.message}
          placeholder="店舗名を入力してください"
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

  const { register, handleSubmit, formState: { errors } } = createForm;
  return (
    <form onSubmit={handleSubmit(onSubmit as (data: ShopInput) => Promise<void>)} className="space-y-4">
      <Input
        {...register('google_map_url')}
        label="Google Map URL"
        error={errors.google_map_url?.message}
        placeholder="https://maps.app.goo.gl/..."
      />
      <Input
        {...register('name')}
        label="店舗名（任意）"
        error={errors.name?.message}
        placeholder="店舗名を入力してください"
      />
      <Input
        {...register('address')}
        label="住所（任意）"
        error={errors.address?.message}
        placeholder="住所を入力してください"
      />
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          キャンセル
        </Button>
        <Button type="submit" loading={loading}>
          作成
        </Button>
      </div>
    </form>
  );
};
