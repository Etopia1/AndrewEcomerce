// src/emailValidation.js
import { z } from 'zod';

// Zod schema for email validation
export const emailSchema = z.string().email('Please enter a valid email.');
