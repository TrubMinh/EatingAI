import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../../src/constants/colors';
import { useRouter } from 'expo-router';

export default function GoalsScreen() {
  const router = useRouter();
  const [goals, setGoals] = useState({
    targetWeight: '60',
    targetCalories: '2000',
    targetProtein: '120',
    targetCarbs: '250',
    targetFat: '65',
    targetWater: '2000',
    targetSteps: '10000',
  });

  const handleSave = () => {
    // TODO: Lưu mục tiêu
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mục tiêu cân nặng</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cân nặng mục tiêu (kg)</Text>
            <TextInput
              style={styles.input}
              value={goals.targetWeight}
              onChangeText={(text) => setGoals({ ...goals, targetWeight: text })}
              placeholder="Nhập cân nặng mục tiêu"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mục tiêu dinh dưỡng</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Calories mục tiêu (kcal)</Text>
            <TextInput
              style={styles.input}
              value={goals.targetCalories}
              onChangeText={(text) => setGoals({ ...goals, targetCalories: text })}
              placeholder="Nhập calories mục tiêu"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Protein mục tiêu (g)</Text>
            <TextInput
              style={styles.input}
              value={goals.targetProtein}
              onChangeText={(text) => setGoals({ ...goals, targetProtein: text })}
              placeholder="Nhập protein mục tiêu"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Carbs mục tiêu (g)</Text>
            <TextInput
              style={styles.input}
              value={goals.targetCarbs}
              onChangeText={(text) => setGoals({ ...goals, targetCarbs: text })}
              placeholder="Nhập carbs mục tiêu"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Chất béo mục tiêu (g)</Text>
            <TextInput
              style={styles.input}
              value={goals.targetFat}
              onChangeText={(text) => setGoals({ ...goals, targetFat: text })}
              placeholder="Nhập chất béo mục tiêu"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mục tiêu hoạt động</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nước mục tiêu (ml)</Text>
            <TextInput
              style={styles.input}
              value={goals.targetWater}
              onChangeText={(text) => setGoals({ ...goals, targetWater: text })}
              placeholder="Nhập lượng nước mục tiêu"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bước chân mục tiêu</Text>
            <TextInput
              style={styles.input}
              value={goals.targetSteps}
              onChangeText={(text) => setGoals({ ...goals, targetSteps: text })}
              placeholder="Nhập số bước chân mục tiêu"
              keyboardType="numeric"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Lưu mục tiêu</Text>
        </TouchableOpacity>
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
  section: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 