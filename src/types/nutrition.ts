export interface Nutrients {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

export interface FoodItem {
  fdcId: number;
  description: string;
  brandOwner: string;
  servingSize: number;
  servingSizeUnit: string;
  nutrients: Nutrients;
}

export interface FoodSearchResult {
  fdcId: number;
  description: string;
  brandOwner: string;
  dataType: string;
  servingSize: number;
  servingSizeUnit: string;
}

export interface ConsumedFood {
  id: string;
  food: FoodItem;
  quantity: number;
  consumedAt: string;
  mealType: string;
  calculatedNutrients: Nutrients;
}

export interface DailyNutrition {
  date: string;
  totalNutrients: Nutrients;
  foods: ConsumedFood[];
}

export interface USDASearchResponse {
  foods: FoodSearchResult[];
}

export interface USDAFoodResponse {
  fdcId: number;
  description: string;
  brandOwner: string;
  servingSize: number;
  servingSizeUnit: string;
  foodNutrients: {
    nutrient: {
      name: string;
      unitName: string;
    };
    amount: number;
  }[];
} 