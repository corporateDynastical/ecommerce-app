import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSizeName(value: string) {
  switch (value) {
    case "XS":
      return "Extra Small"
    case "S":
      return "Small"
    case "M":
      return "Medium"
    case "L":
      return "Large"
    case "XL":
      return "X-Large"
    case "One":
      return "One Size"
  }
}

export function getDiscount(value: string) {
  switch (value) {
    case "COUPON1":
      return 10
    case "COUPON2":
      return 20
    case "COUPON3":
      return 30
    case "COUPON4":
      return 40
    case "COUPON5":
      return 50
  }
}