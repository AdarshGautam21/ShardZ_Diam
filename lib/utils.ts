import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge" //dtd

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
