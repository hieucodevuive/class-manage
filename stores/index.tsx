import { create } from 'zustand';

type State = {
  isLoading: boolean;
  params?: { [key: string]: string }[];
};

type Actions = {
  updateState: <K extends keyof State>(key: K, value: State[K]) => void;
};

type AppState = State & Actions;

export const useAppStore = create<AppState>((set, get) => ({
  isLoading: false,
  params: [],

  getParam: (key: string) => {
    const params = get().params;
    return params?.filter((e) => e?.key === key)?.[0]?.value as string;
  },
  updateState: (key, value) =>
    set({
      [key]: value,
    }),
}));
