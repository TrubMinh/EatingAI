import { useState } from 'react';
import { OnboardingStep, Gender, HeightUnit, WeightUnit } from '../types';

export interface OnboardingData {
  uid?: string;
  gender: Gender | null;
  age: number | null;
  height: number | null;
  heightUnit: HeightUnit;
  weight: number | null;
  weightUnit: WeightUnit;
  targetWeight: number | null;
  targetWeightUnit: WeightUnit;
  goal: string;
  eventDate: Date;
  activityLevel: string;
  weightLossSpeed: number;
  healthCondition: string;
  name: string;
}

export function useOnboarding() {
  const [step, setStep] = useState<OnboardingStep>('onboarding');
  const [data, setData] = useState<Partial<OnboardingData>>({
    gender: null,
    age: null,
    height: null,
    heightUnit: 'cm',
    weight: null,
    weightUnit: 'kg',
    targetWeight: null,
    targetWeightUnit: 'kg',
    goal: 'lose_weight',
    eventDate: new Date(),
    activityLevel: 'sedentary',
    weightLossSpeed: 0.32,
    healthCondition: 'none',
    name: '',
  });

  // Hàm cập nhật dữ liệu
  const updateData = (partial: Partial<OnboardingData>) => setData(d => ({ ...d, ...partial }));

  // Hàm chuyển bước
  const nextStep = (next: OnboardingStep) => setStep(next);
  const prevStep = (prev: OnboardingStep) => setStep(prev);

  // Các hàm logic tính toán
  const calcBMR = () => {
    const { weight, height, age, gender } = data;
    if (!weight || !height || !age || !gender) return 0;
    if (gender === 'male') {
      return Math.round(88.362 + 13.397 * weight + 4.799 * height - 5.677 * age);
    } else {
      return Math.round(447.593 + 9.247 * weight + 3.098 * height - 4.330 * age);
    }
  };
  const activityFactors: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very_active: 1.725,
  };
  const activityFactor = activityFactors[data.activityLevel ?? 'sedentary'] || 1.2;
  const bmr = calcBMR();
  const tdee = Math.round(bmr * activityFactor);

  return {
    step,
    setStep,
    data,
    setData,
    updateData,
    nextStep,
    prevStep,
    bmr,
    tdee,
    activityFactor,
  };
} 