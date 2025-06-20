import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import ProgressBar from '../common/ProgressBar';
import ContinueButton from '../ui/ContinueButton';

interface WeightScreenProps {
  onBack: () => void;
  onContinue: (weight: number, unit: 'kg' | 'lbs') => void;
  heightCm: number;
}

export default function WeightScreen({ onBack, onContinue, heightCm }: WeightScreenProps) {
  const handleBack = () => {
    onBack();
  };
  const minWeight = 30;
  const maxWeight = 200;
  const [weight, setWeight] = useState<number>(minWeight);
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');

  const convertToLbs = (kg: number) => {
    return Math.round(kg * 2.20462);
  };

  const convertToKg = (lbs: number) => {
    return Math.round(lbs / 2.20462);
  };

  const handleUnitChange = (newUnit: 'kg' | 'lbs') => {
    if (newUnit !== unit) {
      if (newUnit === 'lbs') {
        setWeight(convertToLbs(weight));
      } else {
        setWeight(convertToKg(weight));
      }
      setUnit(newUnit);
    }
  };

  const handleWeightChange = (value: number) => {
    if (value >= minWeight && value <= maxWeight) {
      setWeight(Math.floor(value));
    }
  };

  const calculateBMI = () => {
    const weightInKg = unit === 'kg' ? weight : convertToKg(weight);
    const heightInM = heightCm / 100;
    const bmi = weightInKg / (heightInM * heightInM);
    return bmi.toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return 'Thiếu cân';
    if (bmi < 25) return 'Bình thường';
    if (bmi < 30) return 'Thừa cân';
    return 'Béo phì';
  };

  const handleContinue = () => {
    onContinue(weight, unit);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#2196F3']}
        style={styles.gradient}
      >
        {/* Progress Bar */}
        <ProgressBar current={5} total={12} />

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        {/* Logo and App Name */}
        <View style={styles.logoContainer}>
          <Text style={styles.appName}>
            Diet<Text style={styles.appNameHighlight}>AI</Text>
          </Text>
        </View>

        {/* (Tùy chọn) Hình minh họa */}
        {/* <Image source={require('../../../assets/images/onboarding-illustration.png')} style={styles.illustration} resizeMode="contain" /> */}

        {/* Question */}
        <Text style={styles.question}>Cân nặng của bạn là bao nhiêu?</Text>

        {/* Unit Toggle */}
        <View style={styles.unitToggle}>
          <TouchableOpacity
            style={[styles.unitButton, unit === 'kg' && styles.unitButtonActive]}
            onPress={() => handleUnitChange('kg')}
          >
            <Text style={[styles.unitButtonText, unit === 'kg' && styles.unitButtonTextActive]}>
              kg
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.unitButton, unit === 'lbs' && styles.unitButtonActive]}
            onPress={() => handleUnitChange('lbs')}
          >
            <Text style={[styles.unitButtonText, unit === 'lbs' && styles.unitButtonTextActive]}>
              lbs
            </Text>
          </TouchableOpacity>
        </View>

        {/* Weight Display */}
        <View style={styles.weightDisplay}>
          <Text style={styles.weightText}>{weight}</Text>
          <Text style={styles.weightUnit}>{unit}</Text>
        </View>

        {/* Weight Slider */}
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={unit === 'kg' ? 40 : 88}
            maximumValue={unit === 'kg' ? 150 : 330}
            value={weight}
            onValueChange={handleWeightChange}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
            thumbTintColor="#FFD700"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>{unit === 'kg' ? '40' : '88'}</Text>
            <Text style={styles.sliderLabel}>{unit === 'kg' ? '150' : '330'}</Text>
          </View>
        </View>

        {/* BMI Display */}
        <View style={styles.bmiContainer}>
          <Text style={styles.bmiLabel}>Chỉ số BMI của bạn:</Text>
          <Text style={styles.bmiValue}>{calculateBMI()}</Text>
          <Text style={styles.bmiCategory}>
            {getBMICategory(parseFloat(calculateBMI()))}
          </Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Cân nặng của bạn giúp chúng tôi tính toán chỉ số BMI và đề xuất kế hoạch giảm/tăng cân phù hợp.
        </Text>
      </LinearGradient>
      <ContinueButton onPress={handleContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 40,
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 32,
    color: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  appNameHighlight: {
    color: '#FFD700',
  },
  illustration: {
    width: 180,
    height: 120,
    alignSelf: 'center',
    marginBottom: 10,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 30,
  },
  unitToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  unitButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  unitButtonActive: {
    backgroundColor: '#fff',
  },
  unitButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  unitButtonTextActive: {
    color: '#4CAF50',
  },
  weightDisplay: {
    alignItems: 'center',
    marginBottom: 30,
  },
  weightText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fff',
  },
  weightUnit: {
    fontSize: 24,
    color: '#fff',
    opacity: 0.8,
  },
  sliderContainer: {
    marginBottom: 30,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  sliderLabel: {
    color: '#fff',
    fontSize: 16,
  },
  bmiContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  bmiLabel: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
  },
  bmiValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 4,
  },
  bmiCategory: {
    fontSize: 20,
    color: '#fff',
    opacity: 0.9,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
}); 