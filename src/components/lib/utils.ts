import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind class names safely, resolving conflicting utility
 * classes (e.g. "p-2 p-4" -> "p-4") the same way shadcn/ui components do.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
