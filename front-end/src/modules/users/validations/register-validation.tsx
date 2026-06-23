import {z} from 'zod';
export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export const loginSchema = z.object({
    email : z.string().min(1, 'Email is Required').email('Please enter valid email'),
    password: z.string().min(8, 'Password must be min 8 chars ').max(20,'Password must be not more than 20 chars')
    
});
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;