import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNGN(amount: number): string {
  return "₦" + amount.toLocaleString("en-NG");
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(0) + "M+";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(0) + "K+";
  }
  return num.toString();
}

export function generateChairNumber(seq: number): string {
  return `AKDT-${seq.toString().padStart(7, "0")}`;
}

