import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { COLORS } from '../../src/constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ConsumedFood, Nutrients } from '../../src/types/nutrition';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DAILY_LOG_KEY = 'daily_food_log';

// Get today's date in YYYY-MM-DD format
const getTodayKey = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

function SectionTitle({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={styles.sectionIcon}>{icon}</Text>
      <Text style={styles.sectionTitle}>{children}</Text>
    </View>
  );
}

function CircleStat({ label, value, max, color, unit, active = true }: any) {
  return (
    <View style={[styles.circleStat, { borderColor: color, opacity: active ? 1 : 0.3 }] }>
      <Text style={[styles.circleValue, { color }]}>{value}</Text>
      <Text style={[styles.circleUnit, { color }]}>{unit}</Text>
      <Text style={styles.circleMax}>/{max}{unit}</Text>
      <Text style={[styles.circleLabel, { color }]}>{label}</Text>
      <Text style={styles.circleRemain}>Còn lại {max - value}{unit}</Text>
    </View>
  );
}

function NutritionOverview({ totals }: { totals: Nutrients }) {
  const nutritionStats = [
    { label: 'Kcal', value: totals.calories, max: 2000, color: '#FF9800', unit: 'kcal' },
    { label: 'Protein', value: totals.protein, max: 129, color: '#2196F3', unit: 'g' },
    { label: 'Chất béo', value: totals.fat, max: 57, color: '#FFD600', unit: 'g' },
    { label: 'Carb', value: totals.carbohydrates, max: 172, color: '#4CAF50', unit: 'g' },
  ];

  return (
    <View style={styles.sectionBox}>
      <SectionTitle icon="🍽️">Tổng quan về Dinh dưỡng</SectionTitle>
      <View style={styles.circleRow}>
        {nutritionStats.map((s, i) => (
          <CircleStat key={i} {...s} />
        ))}
      </View>
    </View>
  );
}

function HeartHealthSection({ totals }: { totals: Nutrients }) {
  const heartStats = [
    { label: 'Cholesterol', value: 0, max: 300, color: '#FFB300', unit: 'mg' },
    { label: 'Omega-3', value: 0, max: 1600, color: '#00BCD4', unit: 'mg' },
    { label: 'Chất xơ', value: totals.fiber, max: 38, color: '#FF9800', unit: 'g' },
    { label: 'Nước', value: 0, max: 3700, color: '#00B8D4', unit: 'mL' },
  ];

  return (
    <View style={styles.sectionBox}>
      <SectionTitle icon="🫀">Sức khỏe Tim mạch</SectionTitle>
      <View style={styles.circleRow}>
        {heartStats.map((s, i) => (
          <CircleStat key={i} {...s} />
        ))}
      </View>
    </View>
  );
}

function ControlConsumptionSection({ totals }: { totals: Nutrients }) {
  const controlStats = [
    { label: 'Đường', value: totals.sugar, max: 25, color: '#E91E63', unit: 'g', active: true },
    { label: 'Chất béo chu...', value: 0, max: 20, color: '#BDBDBD', unit: 'g', active: false },
    { label: 'Caffeine', value: 0, max: 400, color: '#A1887F', unit: 'mg', active: false },
    { label: 'Rượu', value: 0, max: 20, color: '#8BC34A', unit: 'g', active: true },
  ];

  return (
    <View style={styles.sectionBox}>
      <SectionTitle icon="✖️">Tiêu thụ Kiểm soát</SectionTitle>
      <View style={styles.circleRow}>
        {controlStats.map((s, i) => (
          <CircleStat key={i} {...s} />
        ))}
      </View>
    </View>
  );
}

export default function NutritionScreen() {
  const [foodLog, setFoodLog] = useState<ConsumedFood[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [totals, setTotals] = useState<Nutrients>({
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0
  });

  useEffect(() => {
    loadFoodLog();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadFoodLog().finally(() => setRefreshing(false));
  }, []);

  const loadFoodLog = async () => {
    try {
      const todayKey = getTodayKey();
      console.log('Loading food log for date:', todayKey); // Debug log
      
      const jsonValue = await AsyncStorage.getItem(`${DAILY_LOG_KEY}_${todayKey}`);
      console.log('Raw food log data:', jsonValue); // Debug log
      
      const log = jsonValue ? JSON.parse(jsonValue) : [];
      console.log('Parsed food log:', log); // Debug log
      
      setFoodLog(log);

      // Calculate totals
      const newTotals = log.reduce(
        (acc: Nutrients, food: ConsumedFood) => {
          console.log('Processing food:', food); // Debug log
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

      console.log('Calculated totals:', newTotals); // Debug log

      setTotals({
        calories: Math.round(newTotals.calories),
        protein: Math.round(newTotals.protein * 100) / 100,
        carbohydrates: Math.round(newTotals.carbohydrates * 100) / 100,
        fat: Math.round(newTotals.fat * 100) / 100,
        fiber: Math.round(newTotals.fiber * 100) / 100,
        sugar: Math.round(newTotals.sugar * 100) / 100,
        sodium: Math.round(newTotals.sodium * 100) / 100
      });
    } catch (error) {
      console.error('Error loading food log:', error);
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="nutrition-outline" size={64} color={COLORS.textSecondary} />
      <Text style={styles.emptyTitle}>Chưa có dữ liệu dinh dưỡng</Text>
      <Text style={styles.emptyText}>
        Hãy thêm thực phẩm vào nhật ký để xem thống kê dinh dưỡng
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {foodLog.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            <NutritionOverview totals={totals} />
            <HeartHealthSection totals={totals} />
            <ControlConsumptionSection totals={totals} />
          </>
        )}
        <View style={{ height: 32 }} />
      </ScrollView>
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
  },
  sectionBox: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  circleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  circleStat: {
    width: '48%',
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  circleUnit: {
    fontSize: 14,
    marginTop: 4,
  },
  circleMax: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  circleLabel: {
    fontSize: 14,
    marginTop: 8,
  },
  circleRemain: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
}); 