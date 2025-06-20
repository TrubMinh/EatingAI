export const calculateBMI = (weightKg: number, heightCm: number): number => {
  const heightInM = heightCm / 100;
  const bmi = weightKg / (heightInM * heightInM);
  return Number(bmi.toFixed(1));
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Thiếu cân';
  if (bmi < 25) return 'Bình thường';
  if (bmi < 30) return 'Thừa cân';
  return 'Béo phì';
}; 