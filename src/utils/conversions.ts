export const convertToFt = (cm: number): number => {
  return Math.round((cm / 30.48) * 10) / 10;
};

export const convertToCm = (ft: number): number => {
  return Math.round(ft * 30.48);
};

export const convertToLbs = (kg: number): number => {
  return Math.round(kg * 2.20462);
};

export const convertToKg = (lbs: number): number => {
  return Math.round(lbs / 2.20462);
}; 