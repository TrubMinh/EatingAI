export type OnboardingStep =
  | 'onboarding'
  | 'login'
  | 'gender'
  | 'age'
  | 'height'
  | 'weight'
  | 'targetWeight'
  | 'goals'
  | 'eventDate'
  | 'activityLevel'
  | 'weightLossSpeed'
  | 'healthCondition'
  | 'name'
  | 'summary'
  | 'main';

export type Gender = 'male' | 'female';
export type HeightUnit = 'cm' | 'ft';
export type WeightUnit = 'kg' | 'lbs';

export interface OnboardingData {
  uid?: string;
  gender: Gender | null;
  age: number | null;
  height: number | null;
  heightUnit: HeightUnit;
  weight: number | null;
  weightUnit: WeightUnit;
  targetWeight?: number | null;
  targetWeightUnit?: WeightUnit;
  goal?: string;
  eventDate?: Date;
  activityLevel?: string;
  weightLossSpeed?: number;
  healthCondition?: string;
  name?: string;
} 