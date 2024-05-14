import { z } from "zod";

export const idSchema = z.number();
export const contentSchema = z.string().min(2).max(40).trim();