import axios, { AxiosResponse } from 'axios';
import { 
  FoodSearchResult, 
  FoodItem, 
  Nutrients, 
  USDASearchResponse, 
  USDAFoodResponse 
} from '../../types/nutrition';

// Note: You'll need to get a free API key from https://fdc.nal.usda.gov/api-key-signup.html
const API_KEY = ''; // Replace with your API key
const BASE_URL = '';

// Search for foods with retry logic
export const searchFoods = async (query: string): Promise<FoodSearchResult[]> => {
  const MAX_RETRIES = 2;
  let retries = 0;

  const attemptSearch = async (): Promise<FoodSearchResult[]> => {
    try {
      console.log('Searching for:', query); // Debug log
      
      const response: AxiosResponse<USDASearchResponse> = await axios.post(
        `${BASE_URL}/foods/search`,
        {
          query: query,
          pageSize: 10,
          dataType: ["Branded", "Foundation", "Survey (FNDDS)", "SR Legacy"]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            api_key: API_KEY
          },
          timeout: 10000
        }
      );

      console.log('Search response:', response.data); // Debug log

      if (!response.data.foods || !Array.isArray(response.data.foods)) {
        console.error('Invalid response format:', response.data);
        throw new Error('Định dạng phản hồi không hợp lệ');
      }

      return response.data.foods.map(food => ({
        fdcId: food.fdcId,
        description: food.description,
        brandOwner: food.brandOwner || '',
        dataType: food.dataType,
        servingSize: food.servingSize || 100,
        servingSizeUnit: food.servingSizeUnit || 'g'
      }));
    } catch (error: any) {
      console.error('Search error:', error); // Debug log

      if (retries < MAX_RETRIES &&
        (error.code === 'ECONNABORTED' ||
          (error.response && (error.response.status === 500 || error.response.status === 503)))) {
        retries++;
        console.log(`Retrying search (${retries}/${MAX_RETRIES})...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * retries));
        return attemptSearch();
      }

      if (error.response) {
        console.error('Error response:', error.response.data); // Debug log
        if (error.response.status === 500) {
          throw new Error('Lỗi server. API USDA có thể đang gặp vấn đề hoặc đã hết hạn mức API key.');
        } else if (error.response.status === 503) {
          throw new Error('Dịch vụ API USDA tạm thời không khả dụng. Vui lòng thử lại sau.');
        } else if (error.response.status === 403) {
          throw new Error('Lỗi API key. Vui lòng kiểm tra API key hoặc lấy key mới từ trang USDA.');
        } else if (error.response.status === 429) {
          throw new Error('Quá nhiều yêu cầu. Vui lòng thử lại sau.');
        } else if (error.response.status === 400) {
          throw new Error('Yêu cầu không hợp lệ. Vui lòng kiểm tra tham số tìm kiếm.');
        }
      } else if (error.request) {
        console.error('No response received:', error.request); // Debug log
        throw new Error('Không nhận được phản hồi từ server. Vui lòng kiểm tra kết nối internet.');
      }

      throw new Error('Không thể tìm kiếm thực phẩm. Vui lòng thử lại.');
    }
  };

  return attemptSearch();
};

// Get detailed nutrition information for a specific food
export const getFoodDetails = async (fdcId: number): Promise<FoodItem> => {
  try {
    console.log('Getting details for food ID:', fdcId); // Debug log

    const response: AxiosResponse<USDAFoodResponse> = await axios.get(`${BASE_URL}/food/${fdcId}`, {
      params: {
        api_key: API_KEY
      },
      timeout: 10000
    });

    console.log('Food details response:', response.data); // Debug log

    const food = response.data;
    const nutrients: Partial<Nutrients> = {};

    food.foodNutrients.forEach(nutrient => {
      const name = nutrient.nutrient.name.toLowerCase();
      const value = nutrient.amount || 0;

      if (name.includes('energy') || name.includes('calorie')) {
        nutrients.calories = Math.round(value);
      } else if (name.includes('protein')) {
        nutrients.protein = Math.round(value * 100) / 100;
      } else if (name.includes('carbohydrate')) {
        nutrients.carbohydrates = Math.round(value * 100) / 100;
      } else if (name.includes('total lipid') || name.includes('fat')) {
        nutrients.fat = Math.round(value * 100) / 100;
      } else if (name.includes('fiber')) {
        nutrients.fiber = Math.round(value * 100) / 100;
      } else if (name.includes('sugars')) {
        nutrients.sugar = Math.round(value * 100) / 100;
      } else if (name.includes('sodium')) {
        nutrients.sodium = Math.round(value * 100) / 100;
      }
    });

    return {
      fdcId: food.fdcId,
      description: food.description,
      brandOwner: food.brandOwner || '',
      servingSize: food.servingSize || 100,
      servingSizeUnit: food.servingSizeUnit || 'g',
      nutrients: {
        calories: nutrients.calories || 0,
        protein: nutrients.protein || 0,
        carbohydrates: nutrients.carbohydrates || 0,
        fat: nutrients.fat || 0,
        fiber: nutrients.fiber || 0,
        sugar: nutrients.sugar || 0,
        sodium: nutrients.sodium || 0
      }
    };
  } catch (error: any) {
    console.error('Error getting food details:', error);
    throw new Error('Không thể lấy thông tin thực phẩm. Vui lòng thử lại.');
  }
};

// Calculate nutrition for a specific quantity
export const calculateNutrition = (foodNutrients: Nutrients, quantity: number, servingSize: number = 100): Nutrients => {
  const multiplier = quantity / servingSize;

  return {
    calories: Math.round(foodNutrients.calories * multiplier),
    protein: Math.round(foodNutrients.protein * multiplier * 100) / 100,
    carbohydrates: Math.round(foodNutrients.carbohydrates * multiplier * 100) / 100,
    fat: Math.round(foodNutrients.fat * multiplier * 100) / 100,
    fiber: Math.round(foodNutrients.fiber * multiplier * 100) / 100,
    sugar: Math.round(foodNutrients.sugar * multiplier * 100) / 100,
    sodium: Math.round(foodNutrients.sodium * multiplier * 100) / 100
  };
}; 
