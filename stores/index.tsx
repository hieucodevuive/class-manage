import { ModuleType } from '@/types';
import { create } from 'zustand';

type State = {
  isLoading: boolean;
  params?: { [key: string]: string }[];
  isOpenDetail: boolean;
  moduleType: ModuleType | null;
  itemId: string | null;
};

type Actions = {
  updateState: <K extends keyof State>(key: K, value: State[K]) => void;
  openPanel: (moduleType: ModuleType, itemId: string) => void;
  closePanel: () => void;
};

type AppState = State & Actions;

export const useAppStore = create<AppState>((set, get) => ({
  isLoading: false,
  params: [],
  isOpenDetail: false,
  moduleType: null,
  itemId: null,

  getParam: (key: string) => {
    const params = get().params;
    return params?.filter((e) => e?.key === key)?.[0]?.value as string;
  },
  updateState: (key, value) =>
    set({
      [key]: value,
    }),
  openPanel: (moduleType, itemId) =>
    set({
      isOpenDetail: true,
      moduleType,
      itemId,
    }),

  closePanel: () =>
    set({
      isOpenDetail: false,
      moduleType: null,
      itemId: null,
    }),
}));
