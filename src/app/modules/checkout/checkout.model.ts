import { model, Schema } from 'mongoose';
import { TCheckout } from './checkout.interface';



// Define the schema for the products within the checkout
const CheckoutProductSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true,
  },
  price: {
    type: Number, // Could be changed to Number if you handle price as a number
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// Checkout Schema
const CheckoutSchema = new Schema(
  {
    products: [
      {
        type: CheckoutProductSchema, // Reference to CheckoutProductSchema
        required: true,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    OrderPhone: {
      type: String,
      required: true,
    },
    townOrCity: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: String, // Changed to String
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: [
        'pending',
        'processing',
        'shipped',
        'out-for-delivery',
        'delivered',
        'cancelled',
        'refunded',
        'failed',
        'on-hold',
        'awaiting-payment',
        'partially-shipped',
        'returned',
        'completed',
        'awaiting-fulfillment',
        'awaiting-pickup',
      ],
      default: 'pending',
    },
    price: {
      type: Number,
      required: true,
    },
    isPlaced: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    couponId : {
      type:String,
      default:""
    }
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);


// Export the model
export const CheckoutModel = model<TCheckout>('Checkout', CheckoutSchema);
