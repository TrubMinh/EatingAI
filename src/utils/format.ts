// src/utils/format.ts

export function formatNumber(num: number): string {
  return num.toLocaleString('vi-VN');
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('vi-VN');
} 