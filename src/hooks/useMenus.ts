import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { menusAPI } from "../services/menus";
import { MenuInput } from "../types/menu";

export const useMenus = () => {
  return useQuery({
    queryKey: ["menus"],
    queryFn: menusAPI.getAll,
  });
};

export const useMenu = (id: number) => {
  return useQuery({
    queryKey: ["menu", id],
    queryFn: () => menusAPI.getById(id),
    enabled: !!id,
  });
};

export const useCreateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MenuInput) => menusAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
  });
};

export const useUpdateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<MenuInput> }) =>
      menusAPI.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      queryClient.invalidateQueries({ queryKey: ["menu", variables.id] });
    },
  });
};

export const useDeleteMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => menusAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
  });
};

// Reference data hooks
export const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: menusAPI.getGenres,
  });
};

export const useSoups = () => {
  return useQuery({
    queryKey: ["soups"],
    queryFn: menusAPI.getSoups,
  });
};

export const useNoodles = () => {
  return useQuery({
    queryKey: ["noodles"],
    queryFn: menusAPI.getNoodles,
  });
};
