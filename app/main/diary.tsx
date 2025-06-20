import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../src/constants/colors';
import AddFoodModal from '../../src/components/nutrition/AddFoodModal';
import { FoodItem, ConsumedFood, Nutrients } from '../../src/types/nutrition';
import { calculateNutrition } from '../../src/services/nutrition/foodApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DAILY_LOG_KEY = 'daily_food_log';

// Get today's date in YYYY-MM-DD format
const getTodayKey = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export default function DiaryScreen() {
  const [foodLog, setFoodLog] = useState<ConsumedFood[]>([]);
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState('');
  const [totals, setTotals] = useState<Nutrients>({
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0
  });

  // Load today's food log
  useEffect(() => {
    loadFoodLog();
  }, []);

  const loadFoodLog = async () => {
    try {
      const todayKey = getTodayKey();
      const jsonValue = await AsyncStorage.getItem(`${DAILY_LOG_KEY}_${todayKey}`);
      const log = jsonValue ? JSON.parse(jsonValue) : [];
      setFoodLog(log);
      calculateTotals(log);
    } catch (error) {
      console.error('Error loading food log:', error);
    }
  };

  // Calculate nutrition totals
  const calculateTotals = (log: ConsumedFood[]) => {
    console.log('Calculating totals for log:', log); // Debug log

    const newTotals = log.reduce(
      (acc: Nutrients, food: ConsumedFood) => {
        console.log('Processing food for totals:', food); // Debug log
        return {
          calories: acc.calories + (food.calculatedNutrients?.calories || 0),
          protein: acc.protein + (food.calculatedNutrients?.protein || 0),
          carbohydrates: acc.carbohydrates + (food.calculatedNutrients?.carbohydrates || 0),
          fat: acc.fat + (food.calculatedNutrients?.fat || 0),
          fiber: acc.fiber + (food.calculatedNutrients?.fiber || 0),
          sugar: acc.sugar + (food.calculatedNutrients?.sugar || 0),
          sodium: acc.sodium + (food.calculatedNutrients?.sodium || 0)
        };
      },
      {
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
        sodium: 0
      }
    );

    console.log('New totals:', newTotals); // Debug log

    setTotals({
      calories: Math.round(newTotals.calories),
      protein: Math.round(newTotals.protein * 100) / 100,
      carbohydrates: Math.round(newTotals.carbohydrates * 100) / 100,
      fat: Math.round(newTotals.fat * 100) / 100,
      fiber: Math.round(newTotals.fiber * 100) / 100,
      sugar: Math.round(newTotals.sugar * 100) / 100,
      sodium: Math.round(newTotals.sodium * 100) / 100
    });
  };

  // Add food to log
  const handleAddFood = async (food: FoodItem, quantity: number, mealType: string) => {
    try {
      console.log('Adding food:', food); // Debug log
      console.log('Quantity:', quantity); // Debug log
      console.log('Meal type:', mealType); // Debug log

      const calculatedNutrients = calculateNutrition(food.nutrients, quantity, food.servingSize);
      console.log('Calculated nutrients:', calculatedNutrients); // Debug log

      const newFood: ConsumedFood = {
        id: Date.now().toString(),
        food,
        quantity,
        consumedAt: new Date().toISOString(),
        mealType,
        calculatedNutrients
      };

      const todayKey = getTodayKey();
      console.log('Today key:', todayKey); // Debug log

      const existingLog = await AsyncStorage.getItem(`${DAILY_LOG_KEY}_${todayKey}`);
      const currentLog = existingLog ? JSON.parse(existingLog) : [];
      console.log('Current log:', currentLog); // Debug log

      const updatedLog = [...currentLog, newFood];
      console.log('Updated log:', updatedLog); // Debug log

      await AsyncStorage.setItem(`${DAILY_LOG_KEY}_${todayKey}`, JSON.stringify(updatedLog));
      
      setFoodLog(updatedLog);
      calculateTotals(updatedLog);
    } catch (error) {
      console.error('Error adding food to log:', error);
    }
  };

  // Remove food from log
  const handleRemoveFood = async (foodId: string) => {
    try {
      const updatedLog = foodLog.filter(food => food.id !== foodId);
      const todayKey = getTodayKey();
      await AsyncStorage.setItem(`${DAILY_LOG_KEY}_${todayKey}`, JSON.stringify(updatedLog));
      
      setFoodLog(updatedLog);
      calculateTotals(updatedLog);
    } catch (error) {
      console.error('Error removing food from log:', error);
    }
  };

  const renderMealSection = (mealType: string, title: string) => {
    const mealFoods = foodLog.filter(food => food.mealType === mealType);
    const mealTotal = mealFoods.reduce(
      (acc, food) => acc + food.calculatedNutrients.calories,
      0
    );

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {mealFoods.map(food => (
          <View key={food.id} style={styles.foodItem}>
            <View style={styles.foodInfo}>
              <Text style={styles.foodName}>{food.food.description}</Text>
              <Text style={styles.foodQuantity}>
                {food.quantity}{food.food.servingSizeUnit} - {food.calculatedNutrients.calories} kcal
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleRemoveFood(food.id)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            setSelectedMealType(mealType);
            setShowAddFoodModal(true);
          }}
        >
          <Text style={styles.addBtnText}>+ Ghi lại thực phẩm</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Nhật ký 1 ngày</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Calo Còn Lại</Text>
          <View style={styles.row}>
            <Text style={styles.calo}>{2000 - totals.calories}</Text>
            <Text style={styles.unit}>kcal</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tổng số hàng ngày</Text>
          <View style={styles.row}>
            <Text style={styles.stat}>{totals.calories}kcal Calo</Text>
            <Text style={styles.stat}>{totals.protein}g Protein</Text>
            <Text style={styles.stat}>{totals.fat}g Chất béo</Text>
            <Text style={styles.stat}>{totals.carbohydrates}g Carbs</Text>
          </View>
        </View>

        {renderMealSection('breakfast', 'Bữa sáng')}
        {renderMealSection('lunch', 'Bữa trưa')}
        {renderMealSection('dinner', 'Bữa tối')}
        {renderMealSection('snack', 'Đồ ăn nhẹ')}
      </ScrollView>

      <AddFoodModal
        visible={showAddFoodModal}
        onClose={() => setShowAddFoodModal(false)}
        onAddFood={handleAddFood}
        mealType={selectedMealType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#F5F7FA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  calo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: 6,
  },
  unit: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  stat: {
    fontSize: 14,
    color: COLORS.text,
    marginRight: 12,
    marginBottom: 2,
  },
  addBtn: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  addBtnText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 14,
    color: COLORS.text,
  },
  foodQuantity: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  removeButton: {
    padding: 4,
  },
  removeButtonText: {
    fontSize: 20,
    color: COLORS.error,
    fontWeight: 'bold',
  },
}); 