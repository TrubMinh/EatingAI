import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import ProgressBar from '../common/ProgressBar';
import ContinueButton from '../ui/ContinueButton';

interface HeightScreenProps {
  onBack: () => void;
  onContinue: (height: number, unit: 'cm' | 'ft') => void;
  gender: 'male' | 'female';
}

export default function HeightScreen({ onBack, onContinue, gender }: HeightScreenProps) {
  const [height, setHeight] = useState(170);
  const [unit, setUnit] = useState<'cm' | 'ft'>('cm');
  const minHeight = 100;
  const maxHeight = 250;

  const convertToFt = (cm: number) => {
    return Math.round((cm / 30.48) * 10) / 10;
  };

  const convertToCm = (ft: number) => {
    return Math.round(ft * 30.48);
  };

  const handleUnitChange = (newUnit: 'cm' | 'ft') => {
    if (newUnit !== unit) {
      if (newUnit === 'ft') {
        setHeight(Math.round((height / 30.48) * 10) / 10);
      } else {
        setHeight(Math.round(height * 30.48));
      }
      setUnit(newUnit);
    }
  };

  const handleHeightChange = (value: number) => {
    if (unit === 'cm') {
      setHeight(Math.round(value));
    } else {
      setHeight(Math.round(value * 10) / 10);
    }
  };

  const handleContinue = () => {
    onContinue(unit === 'cm' ? height : convertToCm(height), 'cm');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#2196F3']}
        style={styles.gradient}
      >
        {/* Progress Bar */}
        <ProgressBar current={4} total={12} />

        {/* Logo and App Name */}
        <View style={styles.logoContainer}>
          <Text style={styles.appName}>
            Diet<Text style={styles.appNameHighlight}>AI</Text>
          </Text>
        </View>

        {/* <Image source={require('../../../assets/images/onboarding-illustration.png')} style={styles.illustration} resizeMode="contain" /> */}

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        {/* Question */}
        <Text style={styles.question}>Chiều cao của bạn là bao nhiêu?</Text>

        {/* Unit Toggle */}
        <View style={styles.unitToggle}>
          <TouchableOpacity
            style={[styles.unitButton, unit === 'cm' && styles.unitButtonActive]}
            onPress={() => handleUnitChange('cm')}
          >
            <Text style={[styles.unitButtonText, unit === 'cm' && styles.unitButtonTextActive]}>
              cm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.unitButton, unit === 'ft' && styles.unitButtonActive]}
            onPress={() => handleUnitChange('ft')}
          >
            <Text style={[styles.unitButtonText, unit === 'ft' && styles.unitButtonTextActive]}>
              ft
            </Text>
          </TouchableOpacity>
        </View>

        {/* Height Display */}
        <View style={styles.heightDisplay}>
          <Text style={styles.heightText}>
            {unit === 'cm' ? Math.round(height) : height.toFixed(1)}
          </Text>
          <Text style={styles.heightUnit}>{unit}</Text>
        </View>

        {/* Height Slider */}
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={unit === 'cm' ? 140 : 4.6}
            maximumValue={unit === 'cm' ? 220 : 7.2}
            value={height}
            onValueChange={handleHeightChange}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
            thumbTintColor="#FFD700"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>{unit === 'cm' ? '140' : '4.6'}</Text>
            <Text style={styles.sliderLabel}>{unit === 'cm' ? '220' : '7.2'}</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Chiều cao của bạn giúp chúng tôi tính toán chỉ số BMI và nhu cầu calo chính xác hơn.
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
  heightDisplay: {
    alignItems: 'center',
    marginBottom: 30,
  },
  heightText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fff',
  },
  heightUnit: {
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
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
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
}); 