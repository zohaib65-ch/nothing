import { StoreSettings } from "@/types";
import { INITIAL_SETTINGS } from "@/constants/seedData";

const SETTINGS_STORAGE_KEY = "nothing_settings_v1";

export class SettingsService {
  private static isBrowser(): boolean {
    return typeof window !== "undefined";
  }

  public static getSettings(): StoreSettings {
    if (!this.isBrowser()) return INITIAL_SETTINGS;
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(INITIAL_SETTINGS));
        return INITIAL_SETTINGS;
      }
      return JSON.parse(stored) as StoreSettings;
    } catch {
      return INITIAL_SETTINGS;
    }
  }

  public static saveSettings(settings: StoreSettings): StoreSettings {
    if (this.isBrowser()) {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
      window.dispatchEvent(new Event("settings_updated"));
    }
    return settings;
  }
}
