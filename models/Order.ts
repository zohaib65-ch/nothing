import mongoose, { Schema, Document, Model } from "mongoose";
import { Order } from "@/types";

export interface IOrderDocument extends Omit<Order, "id">, Document {
  _id: any;
}

const OrderItemSchema = new Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  variantId: { type: String, required: true },
  variantName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  image: { type: String },
});

const OrderSchema = new Schema<IOrderDocument>(
  {
    _id: { type: String }, // Custom short ID
    fullName: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    postalCode: { type: String, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    phone2: { type: String, trim: true },
    paymentMethod: { type: String, enum: ["bank_transfer", "cod"], default: "bank_transfer" },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, required: true, default: 0 },
    tax: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "cancelled", "completed"],
      default: "pending",
    },
    receiptImage: { type: String, trim: true },
    customId: { type: String, trim: true },
  },
  { timestamps: true }
);

OrderSchema.set("toJSON", {
  transform: (doc, ret: Record<string, any>) => {
    ret.id = ret._id ? ret._id.toString() : ret.id;
    ret.customId = ret.id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

if (mongoose.models && mongoose.models.Order) {
  delete mongoose.models.Order;
}

export const OrderModel: Model<IOrderDocument> =
  mongoose.models.Order || mongoose.model<IOrderDocument>("Order", OrderSchema);
