import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../common/ProgressBar';
import ContinueButton from '../ui/ContinueButton';

const goals = [
  { key: 'lose_weight', label: 'Giảm cân', icon: '⚖️' },
  { key: 'improve_health', label: 'Sức khỏe được cải thiện', icon: '🌱' },
  { key: 'gain_weight', label: 'Tăng cân', icon: '💪' },
];

interface GoalsScreenProps {
  onBack: () => void;
  onContinue: (goal: string) => void;
}

export default function GoalsScreen({ onBack, onContinue }: GoalsScreenProps) {
  const [selected, setSelected] = useState<string>('lose_weight');

  const handleContinue = () => {
    onContinue(selected);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4CAF50', '#2196F3']} style={styles.gradient}>
        <ProgressBar current={6
        } total={12} />

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        {/* Logo and App Name */}
        <View style={styles.logoContainer}>
          <Text style={styles.appName}>
            Diet<Text style={styles.appNameHighlight}>AI</Text>
          </Text>
        </View>

        {/* Illustration */}
        <Image
          source={require('../../../assets/images/onboarding-illustration.png')}
          style={styles.illustration}
          resizeMode="contain"
        />

        {/* Icon mục tiêu */}
        <Text style={styles.goalIcon}>🎯</Text>

        {/* Question */}
        <Text style={styles.question}>Mục tiêu chính về chế độ ăn uống của bạn là gì?</Text>

        {/* Goals List */}
        <View style={styles.goalsList}>
          {goals.map(goal => (
            <TouchableOpacity
              key={goal.key}
              style={[
                styles.goalItem,
                selected === goal.key && styles.goalItemSelected,
              ]}
              onPress={() => setSelected(goal.key)}
            >
              <Text style={styles.goalItemIcon}>{goal.icon}</Text>
              <Text style={styles.goalItemLabel}>{goal.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
      <ContinueButton onPress={handleContinue} disabled={!selected} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1, padding: 20 },
  backButton: {
    position: 'absolute', left: 20, top: 40, zIndex: 10,
  },
  backButtonText: { fontSize: 32, color: '#fff' },
  logoContainer: { alignItems: 'center', marginBottom: 10 },
  appName: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
  appNameHighlight: { color: '#FFD700' },
  illustration: { width: 120, height: 120, alignSelf: 'center', marginBottom: 10 },
  goalIcon: { fontSize: 36, textAlign: 'center', marginBottom: 8, color: '#222' },
  question: {
    fontSize: 20, fontWeight: 'bold', color: '#222', textAlign: 'center', marginBottom: 18,
  },
  goalsList: { marginBottom: 30 },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  goalItemSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#fff',
  },
  goalItemIcon: { fontSize: 24, marginRight: 12 },
  goalItemLabel: { fontSize: 18, color: '#222', fontWeight: 'bold' },
  continueButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  continueButtonText: {
    color: '#fff', fontSize: 18, fontWeight: 'bold',
  },
}); 