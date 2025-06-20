import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import ProgressBar from '../common/ProgressBar';
import ContinueButton from '../ui/ContinueButton';

interface AgeScreenProps {
  onBack: () => void;
  onContinue: (age: number) => void;
}

export default function AgeScreen({ onBack, onContinue }: AgeScreenProps) {
  const [age, setAge] = useState(25);

  const handleAgeChange = (value: number) => {
    if (value >= 10
       && value <= 100) {
      setAge(Math.floor(value));
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#2196F3']}
        style={styles.gradient}
      >
        {/* Progress Bar */}
        <ProgressBar current={3} total={12} />

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

        {/* (Tùy chọn) Hình minh họa */}
        {/* <Image source={require('../../../assets/images/onboarding-illustration.png')} style={styles.illustration} resizeMode="contain" /> */}

        {/* Question */}
        <Text style={styles.question}>Bạn bao nhiêu tuổi?</Text>

        {/* Age Display */}
        <View style={styles.ageDisplay}>
          <Text style={styles.ageText}>{age}</Text>
          <Text style={styles.ageLabel}>tuổi</Text>
        </View>

        {/* Age Slider */}
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={10}
            maximumValue={100}
            value={age}
            onValueChange={handleAgeChange}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
            thumbTintColor="#FFD700"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>10</Text>
            <Text style={styles.sliderLabel}>100</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Tuổi của bạn giúp chúng tôi tính toán nhu cầu calo và dinh dưỡng phù hợp với độ tuổi của bạn.
        </Text>
      </LinearGradient>
      <ContinueButton onPress={() => onContinue(age)} />
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
  ageDisplay: {
    alignItems: 'center',
    marginBottom: 30,
  },
  ageText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fff',
  },
  ageLabel: {
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
}); 