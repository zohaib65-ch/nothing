import mongoose, { Schema, Document, Model } from "mongoose";
import { StoreSettings } from "@/types";

export interface ISettingsDocument extends StoreSettings, Document {}

const SettingsSchema = new Schema<ISettingsDocument>(
  {
    storeName: { type: String, default: "NOTHING (INTL)" },
    logoUrl: { type: String, default: "/logo.png" },
    whatsappNumber: { type: String, default: "+18005550199" },
    whatsappMessageTemplate: { type: String },
    announcementBar: {
      enabled: { type: Boolean, default: true },
      text: { type: String, default: "NEW RELEASE: Phone (2a) Plus is now available." },
      link: { type: String, default: "/products/nothing-phone-2a-plus" },
      linkText: { type: String, default: "EXPLORE NOW" },
    },
    socialLinks: {
      instagram: { type: String, default: "https://instagram.com/nothing" },
      x: { type: String, default: "https://x.com/nothing" },
      youtube: { type: String, default: "https://youtube.com/@nothingtech" },
      discord: { type: String, default: "https://discord.gg/nothingtech" },
    },
    homepageHero: {
      productId: { type: String },
      title: { type: String, default: "PHONE (2a) PLUS" },
      subtitle: { type: String, default: "EXTRAORDINARY POWER. METALLIC CRAFT." },
      badge: { type: String, default: "NEW ARRIVAL" },
      videoUrl: { type: String },
      bgImageUrl: { type: String },
    },
    seoDefaults: {
      metaTitle: { type: String, default: "Nothing Tech - Premium Design & Technology" },
      metaDescription: { type: String, default: "Discover Nothing Phone (2a) Plus, Ear (open), and CMF." },
      ogImage: { type: String },
    },
  },
  { timestamps: true }
);

export const SettingsModel: Model<ISettingsDocument> =
  mongoose.models.Settings || mongoose.model<ISettingsDocument>("Settings", SettingsSchema);
