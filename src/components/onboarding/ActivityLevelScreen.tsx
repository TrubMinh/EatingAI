import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../common/ProgressBar';
import ContinueButton from '../ui/ContinueButton';

const activityLevels = [
  { key: 'sedentary', label: 'Ít vận động', icon: '🛋️', info: 'Ít hoặc không tập luyện' },
  { key: 'light', label: 'Hoạt động nhẹ', icon: '🚶', info: 'Tập nhẹ 1-3 ngày/tuần' },
  { key: 'moderate', label: 'Hoạt động vừa phải', icon: '🏃', info: 'Tập vừa 3-5 ngày/tuần' },
  { key: 'very_active', label: 'Rất năng động', icon: '🔥', info: 'Tập nặng 6-7 ngày/tuần' },
];

interface ActivityLevelScreenProps {
  onBack: () => void;
  onContinue: (level: string) => void;
  bmr: number;
  activityFactor: number;
  tdee: number;
}

export default function ActivityLevelScreen({ onBack, onContinue, bmr, activityFactor, tdee }: ActivityLevelScreenProps) {
  const [selected, setSelected] = useState<string>('sedentary');

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4CAF50', '#2196F3']} style={styles.gradient}>
        <ProgressBar current={9} total={12} />

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

        {/* Icon hoạt động */}
        <Text style={styles.activityIcon}>👟</Text>

        {/* Question */}
        <Text style={styles.question}>Bạn hoạt động như thế nào hàng ngày?</Text>

        {/* Info Row */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>BMR <Text style={styles.infoIcon}>ⓘ</Text></Text>
          <Text style={styles.infoValue}>{bmr}kcal</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Hệ số hoạt động <Text style={styles.infoIcon}>ⓘ</Text></Text>
          <Text style={styles.infoValue}>{activityFactor}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>TDEE <Text style={styles.infoIcon}>ⓘ</Text></Text>
          <Text style={styles.infoValue}>{tdee}kcal</Text>
        </View>

        {/* Activity Levels List */}
        <View style={styles.levelsList}>
          {activityLevels.map(level => (
            <TouchableOpacity
              key={level.key}
              style={[
                styles.levelItem,
                selected === level.key && styles.levelItemSelected,
              ]}
              onPress={() => setSelected(level.key)}
            >
              <Text style={styles.levelItemIcon}>{level.icon}</Text>
              <Text style={styles.levelItemLabel}>{level.label}</Text>
              <TouchableOpacity style={styles.infoCircle}>
                <Text style={styles.infoCircleText}>i</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
      <ContinueButton onPress={() => onContinue(selected)} disabled={!selected} />
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
  appNameHighlight: { color: '#4CAF50' },
  illustration: { width: 120, height: 120, alignSelf: 'center', marginBottom: 10 },
  activityIcon: { fontSize: 36, textAlign: 'center', marginBottom: 8, color: '#222' },
  question: {
    fontSize: 20, fontWeight: 'bold', color: '#222', textAlign: 'center', marginBottom: 18,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
    marginHorizontal: 10,
  },
  infoLabel: { fontSize: 16, color: '#222' },
  infoIcon: { fontSize: 14, color: '#888' },
  infoValue: { fontSize: 16, color: '#222', fontWeight: 'bold' },
  levelsList: { marginBottom: 30, marginTop: 10 },
  levelItem: {
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
  levelItemSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#fff',
  },
  levelItemIcon: { fontSize: 24, marginRight: 12 },
  levelItemLabel: { fontSize: 18, color: '#222', fontWeight: 'bold', flex: 1 },
  infoCircle: {
    width: 24, height: 24, borderRadius: 12, backgroundColor: '#e3f2fd',
    alignItems: 'center', justifyContent: 'center', marginLeft: 8,
    borderWidth: 1, borderColor: '#4CAF50',
  },
  infoCircleText: { color: '#1976d2', fontWeight: 'bold' },
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