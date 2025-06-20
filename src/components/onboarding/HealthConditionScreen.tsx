import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../common/ProgressBar';
import ContinueButton from '../ui/ContinueButton';

const healthOptions = [
  { key: 'none', label: 'Không có', icon: '✅' },
  { key: 'hypertension', label: 'Huyết áp cao', icon: '💗' },
  { key: 'diabetes', label: 'Bệnh tiểu đường', icon: '🍭' },
  { key: 'cholesterol', label: 'Cholesterol cao', icon: '🍟' },
  { key: 'other', label: 'Khác', icon: '❓' },
];

interface HealthConditionScreenProps {
  onBack: () => void;
  onContinue: (condition: string) => void;
}

export default function HealthConditionScreen({ onBack, onContinue }: HealthConditionScreenProps) {
  const [selected, setSelected] = useState<string>('none');

  const handleContinue = () => {
    onContinue(selected);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4CAF50', '#2196F3']} style={styles.gradient}>
        <ProgressBar current={11} total={12} />

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

        {/* Icon nhịp tim */}
        <Text style={styles.heartIcon}>💓</Text>

        {/* Question */}
        <Text style={styles.question}>Bạn có bất kỳ tình trạng sức khỏe nào không?</Text>

        {/* Health Options List */}
        <View style={styles.optionsList}>
          {healthOptions.map(option => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.optionItem,
                selected === option.key && styles.optionItemSelected,
              ]}
              onPress={() => setSelected(option.key)}
            >
              <Text style={styles.optionIcon}>{option.icon}</Text>
              <Text style={styles.optionLabel}>{option.label}</Text>
              {selected === option.key && (
                <Text style={styles.checkIcon}>✔️</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
      <ContinueButton onPress={handleContinue} />
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
  heartIcon: { fontSize: 36, textAlign: 'center', marginBottom: 8, color: '#222' },
  question: {
    fontSize: 20, fontWeight: 'bold', color: '#222', textAlign: 'center', marginBottom: 18,
  },
  optionsList: { marginBottom: 30, marginTop: 10 },
  optionItem: {
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
  optionItemSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#fff',
  },
  optionIcon: { fontSize: 24, marginRight: 12 },
  optionLabel: { fontSize: 18, color: '#222', fontWeight: 'bold', flex: 1 },
  checkIcon: { fontSize: 22, color: '#4CAF50', marginLeft: 8 },
}); 