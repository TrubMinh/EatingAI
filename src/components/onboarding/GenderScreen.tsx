import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../common/ProgressBar';
import ContinueButton from '../ui/ContinueButton';

interface GenderScreenProps {
  onBack: () => void;
  onContinue: (gender: 'male' | 'female') => void;
}

export default function GenderScreen({ onBack, onContinue }: GenderScreenProps) {
  const [selected, setSelected] = useState<'male' | 'female'>('male');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#2196F3']}
        style={styles.gradient}
      >
        {/* Progress Bar */}
        <ProgressBar current={2} total={12} />

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

        {/* Icon giới tính */}
        <View style={styles.genderIconContainer}>
          <Text style={styles.genderIcon}>⚥</Text>
        </View>

        {/* Question */}
        <Text style={styles.question}>Giới tính của bạn là gì?</Text>

        {/* Gender Selection */}
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[styles.genderBox, selected === 'male' && styles.genderBoxSelected]}
            onPress={() => setSelected('male')}
          >
            <Image
              source={require('../../../assets/images/male-avatar.png')}
              style={styles.genderImage}
              resizeMode="contain"
            />
            <Text style={styles.genderLabel}>Nam</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.genderBox, selected === 'female' && styles.genderBoxSelected]}
            onPress={() => setSelected('female')}
          >
            <Image
              source={require('../../../assets/images/female-avatar.png')}
              style={styles.genderImage}
              resizeMode="contain"
            />
            <Text style={styles.genderLabel}>Nữ</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Chúng tôi sử dụng giới tính của bạn để thiết kế kế hoạch ăn kiêng tốt nhất cho bạn. Nếu bạn không xác định mình là bất kỳ lựa chọn nào trong số này, vui lòng chọn giới tính gần nhất với hồ sơ nội tiết tố của bạn.
        </Text>
      </LinearGradient>
      <ContinueButton onPress={() => onContinue(selected)} disabled={selected === null} />
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
    color: '#222',
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
  genderIconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  genderIcon: {
    fontSize: 36,
    color: '#222',
    marginBottom: 10,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 30,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  genderBox: {
    width: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  genderBoxSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  genderImage: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  genderLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
}); 