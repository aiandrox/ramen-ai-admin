import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shopsAPI } from '../services/shops';
import { Shop, ShopInput } from '../types/shop';

export const useShops = () => {
  return useQuery({
    queryKey: ['shops'],
    queryFn: shopsAPI.getAll,
  });
};

export const useShop = (id: number) => {
  return useQuery({
    queryKey: ['shop', id],
    queryFn: () => shopsAPI.getById(id),
    enabled: !!id,
  });
};

export const useCreateShop = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: ShopInput) => shopsAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shops'] });
    },
  });
};

export const useUpdateShop = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ShopInput> }) => 
      shopsAPI.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['shops'] });
      queryClient.invalidateQueries({ queryKey: ['shop', variables.id] });
    },
  });
};

export const useDeleteShop = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => shopsAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shops'] });
    },
  });
};