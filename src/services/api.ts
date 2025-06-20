// src/services/api.ts
// Mẫu gọi API, có thể mở rộng cho các endpoint khác

export async function fetchExample() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  if (!response.ok) throw new Error('Network error');
  return response.json();
} 