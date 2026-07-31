import * as React from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

export const EXTENDED_COLOR_MAP: Record<string, string> = {
  "dark grey": "#1C1C1E",
  "dark gray": "#1C1C1E",
  "light grey": "#E5E5E5",
  "light gray": "#E5E5E5",
  "milk white": "#F5F5F0",
  "off white": "#FAF9F6",
  "space gray": "#4B4B4D",
  "space grey": "#4B4B4D",
  "rose gold": "#B76E79",
  "midnight": "#191970",
  "starlight": "#F0EDE6",
  "graphite": "#383838",
  "pacific blue": "#2D545E",
  "sierra blue": "#9BB0C1",
  "deep purple": "#4B2E83",
  "natural titanium": "#9B9994",
  "desert titanium": "#C5B39B",
  "black titanium": "#2C2C2E",
  "white titanium": "#F2F2F2",
  "cosmic black": "#181818",
  "sky blue": "#87CEEB",
  "navy blue": "#000080",
  "royal blue": "#4169E1",
  "emerald green": "#50C878",
  "mint green": "#98FF98",
  "champagne": "#F7E7CE",
  "bronze": "#CD7F32",
  "gold": "#FFD700",
  "silver": "#C0C0C0",
  "black": "#000000",
  "white": "#FFFFFF",
  "red": "#D71921",
  "blue": "#0B5CFF",
  "pink": "#FFB6C1",
  "purple": "#800080",
  "yellow": "#FFFF00",
  "green": "#008000",
  "orange": "#FFA500",
  "grey": "#808080",
  "gray": "#808080",
  "cyan": "#00FFFF",
  "magenta": "#FF00FF",
  "violet": "#EE82EE",
  "indigo": "#4B0082",
  "turquoise": "#40E0D0",
  "teal": "#008080",
  "beige": "#F5F5DC",
  "brown": "#A52A2A",
  "maroon": "#800000",
  "khaki": "#F0E68C",
  "coral": "#FF7F50",
  "crimson": "#DC143C",
  "lavender": "#E6E6FA",
  "charcoal": "#36454F",
};

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return { r, g, b };
  }
  if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

/**
 * Resolves color name or raw hex to a standard 6-digit uppercase hex code string (#RRGGBB).
 */
export function getColorHexFromName(colorStr: string): string | null {
  if (!colorStr || typeof colorStr !== "string") return null;
  const clean = colorStr.trim().toLowerCase();
  if (!clean) return null;

  // 1. Hex match (#FFF, #FFFFFF, FFF, FFFFFF)
  if (/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(clean)) {
    let hex = clean.startsWith("#") ? clean : `#${clean}`;
    if (hex.length === 4) {
      hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
    }
    return hex.toUpperCase();
  }

  // 2. Custom Tech & Extended presets lookup
  if (EXTENDED_COLOR_MAP[clean]) {
    return EXTENDED_COLOR_MAP[clean];
  }

  // 3. Fallback to HTML/CSS DOM Color Parser
  if (typeof window !== "undefined") {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = clean;
        const computed = ctx.fillStyle;
        if (computed.startsWith("#")) {
          return computed.toUpperCase();
        }
        const match = computed.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (match) {
          const r = parseInt(match[1], 10).toString(16).padStart(2, "0");
          const g = parseInt(match[2], 10).toString(16).padStart(2, "0");
          const b = parseInt(match[3], 10).toString(16).padStart(2, "0");
          return `#${r}${g}${b}`.toUpperCase();
        }
      }
    } catch {
      return null;
    }
  }

  return null;
}

/**
 * Reverse lookup color name from a HEX string using exact match + nearest Euclidean distance match
 */
export function getColorNameFromHex(hex: string): string | null {
  if (!hex) return null;
  const cleanHex = hex.trim().toUpperCase();
  
  // 1. Check exact match
  for (const [name, h] of Object.entries(EXTENDED_COLOR_MAP)) {
    if (h.toUpperCase() === cleanHex) {
      return name.replace(/\b\w/g, (l) => l.toUpperCase());
    }
  }

  // 2. Nearest Euclidean distance RGB match
  const targetRgb = hexToRgb(cleanHex);
  if (!targetRgb) return null;

  let minDistance = Infinity;
  let closestName: string | null = null;

  for (const [name, h] of Object.entries(EXTENDED_COLOR_MAP)) {
    const mapRgb = hexToRgb(h);
    if (!mapRgb) continue;

    const dist = Math.sqrt(
      Math.pow(targetRgb.r - mapRgb.r, 2) +
      Math.pow(targetRgb.g - mapRgb.g, 2) +
      Math.pow(targetRgb.b - mapRgb.b, 2)
    );

    if (dist < minDistance) {
      minDistance = dist;
      closestName = name.replace(/\b\w/g, (l) => l.toUpperCase());
    }
  }

  return closestName;
}

/**
 * Formats a hex string into a safe 7-character #RRGGBB format for <input type="color">
 */
export function formatValidHexForPicker(hex: string): string {
  if (!hex) return "#000000";
  let clean = hex.trim();
  if (!clean.startsWith("#")) clean = `#${clean}`;
  if (/^#[0-9a-fA-F]{6}$/.test(clean)) return clean;
  if (/^#[0-9a-fA-F]{3}$/.test(clean)) {
    return `#${clean[1]}${clean[1]}${clean[2]}${clean[2]}${clean[3]}${clean[3]}`;
  }
  return "#000000";
}

/**
 * Custom React Hook for color fetching, parsing, and bi-directional form field synchronization
 */
export function useColorFetcher(
  setValue?: UseFormSetValue<any>,
  watch?: UseFormWatch<any>
) {
  // Sync handler for Color Name input change
  const handleColorNameChange = React.useCallback(
    (index: number, colorNameVal: string) => {
      if (!setValue || !watch) return;
      const st = watch(`variants.${index}.storage`) || watch(`variants.${index}.capacity`) || "";

      // Check if user typed raw hex code in color name box (e.g. "#FF0000" or "FF0000")
      if (/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(colorNameVal.trim())) {
        const autoHex = getColorHexFromName(colorNameVal);
        if (autoHex) {
          setValue(`variants.${index}.colorHex`, autoHex, { shouldDirty: true });
          const fetchedName = getColorNameFromHex(autoHex);
          if (fetchedName) {
            setValue(`variants.${index}.color`, fetchedName, { shouldDirty: true });
            setValue(`variants.${index}.name`, `${fetchedName}${st ? ` - ${st}` : ""}`, { shouldDirty: true });
            return;
          }
        }
      }

      setValue(`variants.${index}.color`, colorNameVal, { shouldDirty: true });
      setValue(`variants.${index}.name`, `${colorNameVal}${st ? ` - ${st}` : ""}`, { shouldDirty: true });

      const autoHex = getColorHexFromName(colorNameVal);
      if (autoHex) {
        setValue(`variants.${index}.colorHex`, autoHex, { shouldDirty: true });
      }
    },
    [setValue, watch]
  );

  // Sync handler for Color Hex text input change
  const handleColorHexInputChange = React.useCallback(
    (index: number, inputVal: string) => {
      if (!setValue || !watch) return;
      const autoHex = getColorHexFromName(inputVal);
      if (autoHex) {
        setValue(`variants.${index}.colorHex`, autoHex, { shouldDirty: true });

        const autoName = getColorNameFromHex(autoHex);
        if (autoName) {
          setValue(`variants.${index}.color`, autoName, { shouldDirty: true });
          const st = watch(`variants.${index}.storage`) || watch(`variants.${index}.capacity`) || "";
          setValue(`variants.${index}.name`, `${autoName}${st ? ` - ${st}` : ""}`, { shouldDirty: true });
        }
      }
    },
    [setValue, watch]
  );

  // Sync handler for Color Picker input change
  const handleColorPickerChange = React.useCallback(
    (index: number, newHex: string) => {
      if (!setValue || !watch) return;
      const uppercaseHex = newHex.toUpperCase();
      setValue(`variants.${index}.colorHex`, uppercaseHex, { shouldDirty: true });

      const autoName = getColorNameFromHex(uppercaseHex);
      if (autoName) {
        setValue(`variants.${index}.color`, autoName, { shouldDirty: true });
        const st = watch(`variants.${index}.storage`) || watch(`variants.${index}.capacity`) || "";
        setValue(`variants.${index}.name`, `${autoName}${st ? ` - ${st}` : ""}`, { shouldDirty: true });
      }
    },
    [setValue, watch]
  );

  return {
    getColorHexFromName,
    getColorNameFromHex,
    formatValidHexForPicker,
    handleColorNameChange,
    handleColorHexInputChange,
    handleColorPickerChange,
  };
}
