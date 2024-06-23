// src/schemas/productSchema.ts
import { z } from 'zod';

export const createProductSchema = z.object({
  title: z.string().min(1, 'Product title is required'),
  // description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().positive('Price must be positive'),
  status: z.string().min(1, 'Status is required'),
  imageUrl: z.string().url('Invalid URL'),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
