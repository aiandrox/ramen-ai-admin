import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Shop, ShopInput } from '../../types/shop';

const schema = yup.object({
  name: yup.string().required('店舗名は必須です'),
  address: yup.string().required('住所は必須です'),
  google_map_url: yup.string().url('有効なURLを入力してください').required('Google Map URLは必須です'),
});

interface ShopFormProps {
  shop?: Shop;
  onSubmit: (data: ShopInput) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const ShopForm: React.FC<ShopFormProps> = ({
  shop,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShopInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: shop ? {
      name: shop.name,
      address: shop.address,
      google_map_url: shop.google_map_url,
    } : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register('name')}
        label="店舗名"
        error={errors.name?.message}
        placeholder="店舗名を入力してください"
      />
      
      <Input
        {...register('address')}
        label="住所"
        error={errors.address?.message}
        placeholder="住所を入力してください"
      />
      
      <Input
        {...register('google_map_url')}
        label="Google Map URL"
        error={errors.google_map_url?.message}
        placeholder="https://maps.google.com/..."
      />

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
          {shop ? '更新' : '作成'}
        </Button>
      </div>
    </form>
  );
};