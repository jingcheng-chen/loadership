import { create } from 'zustand';

interface IConfigStore {
  settings: IUserSettings;
  updateSettings: (settings: IUserSettings) => void;
}

export const useConfigStore = create<IConfigStore>((set) => ({
  settings: {
    backgroundColor: '#d1d5db',
    showFrame: false,
    language: 'html',
  },
  updateSettings: (settings: IUserSettings) => set({ settings }),
}));
