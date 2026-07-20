import { create } from "zustand";
import { StoreSettings } from "@/types";
import { SettingsService } from "@/services/settingsService";
import { INITIAL_SETTINGS } from "@/constants/seedData";

interface SettingsState {
  settings: StoreSettings;
  loadSettings: () => void;
  updateSettings: (newSettings: StoreSettings) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: INITIAL_SETTINGS,
  loadSettings: () => {
    const current = SettingsService.getSettings();
    set({ settings: current });
  },
  updateSettings: (newSettings) => {
    const saved = SettingsService.saveSettings(newSettings);
    set({ settings: saved });
  },
}));
