import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import ProgressBar from '../common/ProgressBar';
import ContinueButton from '../ui/ContinueButton';

interface TargetWeightScreenProps {
  onBack: () => void;
  onContinue: (targetWeight: number, unit: 'kg' | 'lbs') => void;
  currentWeight: number;
  heightCm: number;
  goal: string;
}

export default function TargetWeightScreen({ onBack, onContinue, currentWeight, heightCm, goal }: TargetWeightScreenProps) {
  const minWeight = 30;
  const maxWeight = 200;
  const getDefaultTarget = () => {
    if (goal === 'lose_weight') return Math.round(currentWeight * 0.95);
    if (goal === 'gain_weight') return Math.round(currentWeight * 1.05);
    return Math.round(currentWeight);
  };
  const [weight, setWeight] = useState<number>(getDefaultTarget());
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
  const [bmiBarWidth, setBmiBarWidth] = useState(0);

  const convertToLbs = (kg: number) => Math.round(kg * 2.20462);
  const convertToKg = (lbs: number) => Math.round(lbs / 2.20462);

  const handleUnitChange = (newUnit: 'kg' | 'lbs') => {
    if (newUnit !== unit) {
      if (newUnit === 'lbs') setWeight(convertToLbs(weight));
      else setWeight(convertToKg(weight));
      setUnit(newUnit);
    }
  };

  const handleWeightChange = (value: number) => setWeight(Math.floor(value));

  const handleBmiBarLayout = (e: LayoutChangeEvent) => {
    setBmiBarWidth(e.nativeEvent.layout.width);
  };

  // Tính BMI dự kiến
  const calculateBMI = () => {
    const weightInKg = unit === 'kg' ? weight : convertToKg(weight);
    const heightInM = heightCm / 100;
    const bmi = weightInKg / (heightInM * heightInM);
    return bmi.toFixed(1);
  };

  // Thông báo giảm 5%
  const weightDiff = (unit === 'kg' ? currentWeight - weight : convertToLbs(currentWeight) - weight);
  const percent = ((weightDiff / (unit === 'kg' ? currentWeight : convertToLbs(currentWeight))) * 100).toFixed(1);

  // Xác định màu BMI
  const getBMICategoryColor = (bmi: number) => {
    if (bmi < 18.5) return '#2196F3'; // Thiếu cân
    if (bmi < 25) return '#4CAF50'; // Bình thường
    if (bmi < 30) return '#FF9800'; // Thừa cân
    return '#F44336'; // Béo phì
  };

  const bmiValue = parseFloat(calculateBMI());
  const bmiColor = getBMICategoryColor(bmiValue);

  // Tính vị trí icon trên thanh BMI
  const bmiMin = 15;
  const bmiMax = 40;
  const bmiPercent = Math.min(1, Math.max(0, (bmiValue - bmiMin) / (bmiMax - bmiMin)));

  // Label cho mục tiêu
  const goalLabel = goal === 'lose_weight'
    ? 'Mục tiêu: Giảm cân'
    : goal === 'gain_weight'
      ? 'Mục tiêu: Tăng cân'
      : 'Mục tiêu: Cải thiện sức khỏe';

  // Cảnh báo nếu cân nặng mục tiêu bằng cân nặng hiện tại hoặc ngoài ngưỡng an toàn
  const isSameWeight = weight === Math.round(currentWeight);
  const isUnsafeWeight = (unit === 'kg' && (weight < 40 || weight > 150)) || (unit === 'lbs' && (weight < 88 || weight > 330));

  const handleContinue = () => {
    onContinue(weight, unit);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4CAF50', '#2196F3']} style={styles.gradient}>
        <ProgressBar current={7} total={12} />

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

        {/* Goal Label */}
        <Text style={styles.goalLabel}>{goalLabel}</Text>
        {/* Cảnh báo nếu cần */}
        {isSameWeight && (
          <Text style={styles.warningText}>⚠️ Bạn chưa thay đổi cân nặng mục tiêu so với hiện tại.</Text>
        )}
        {isUnsafeWeight && (
          <Text style={styles.warningText}>⚠️ Cân nặng mục tiêu này có thể không an toàn. Hãy chọn giá trị hợp lý!</Text>
        )}

        {/* Question */}
        <Text style={styles.question}>Cân nặng mục tiêu của bạn là bao nhiêu?</Text>

        {/* Unit Toggle */}
        <View style={styles.unitToggle}>
          <TouchableOpacity
            style={[styles.unitButton, unit === 'kg' && styles.unitButtonActive]}
            onPress={() => handleUnitChange('kg')}
          >
            <Text style={[styles.unitButtonText, unit === 'kg' && styles.unitButtonTextActive]}>kg</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.unitButton, unit === 'lbs' && styles.unitButtonActive]}
            onPress={() => handleUnitChange('lbs')}
          >
            <Text style={[styles.unitButtonText, unit === 'lbs' && styles.unitButtonTextActive]}>lbs</Text>
          </TouchableOpacity>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Giảm {Number(percent) > 0 ? percent : 0}% cân!</Text>
          <Text style={styles.infoText}>
            Bạn sẽ giảm {weightDiff > 0 ? weightDiff : 0} {unit} để đạt được cân nặng mục tiêu! Chỉ số BMI của bạn sẽ là {calculateBMI()}.
            <Text style={styles.bmiExplain} onPress={() => alert('BMI là chỉ số khối cơ thể, giúp đánh giá tình trạng cân nặng của bạn.')}>
              {' '}ⓘ
            </Text>
          </Text>
        </View>

        {/* BMI Bar with dot */}
        <View style={styles.bmiBarContainer}>
          <View style={styles.bmiBarBg} onLayout={handleBmiBarLayout}>
            <View style={[styles.bmiBarSection, { backgroundColor: '#2196F3', flex: 18.5 }]} />
            <View style={[styles.bmiBarSection, { backgroundColor: '#4CAF50', flex: 6.5 }]} />
            <View style={[styles.bmiBarSection, { backgroundColor: '#FF9800', flex: 5 }]} />
            <View style={[styles.bmiBarSection, { backgroundColor: '#F44336', flex: 5 }]} />
            {/* Dot icon */}
            {bmiBarWidth > 0 && (
              <View style={[styles.bmiDot, { left: bmiPercent * (bmiBarWidth - 16) }]} />
            )}
          </View>
          <View style={styles.bmiLabels}>
            <Text style={styles.bmiLabel}>18.5</Text>
            <Text style={styles.bmiLabel}>25.0</Text>
            <Text style={styles.bmiLabel}>30.0</Text>
            <Text style={styles.bmiLabel}>35.0</Text>
          </View>
        </View>

        {/* Target Weight Display */}
        <View style={styles.weightDisplay}>
          <Text style={[styles.weightText, { color: '#fff' }]}>{weight}</Text>
          <Text style={styles.weightUnit}>{unit}</Text>
        </View>

        {/* Slider */}
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
  infoBox: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  infoTitle: {
    color: '#1976d2',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  infoText: {
    color: '#1976d2',
    fontSize: 14,
  },
  bmiBarContainer: {
    marginVertical: 10,
  },
  bmiBarBg: {
    flexDirection: 'row',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#e0e0e0',
  },
  bmiBarSection: {
    height: 10,
  },
  bmiDot: {
    position: 'absolute',
    top: -6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFD700',
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 2,
  },
  bmiLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    paddingHorizontal: 2,
  },
  bmiLabel: {
    fontSize: 12,
    color: '#222',
  },
  weightDisplay: {
    alignItems: 'center',
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  weightText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  weightUnit: {
    fontSize: 24,
    color: '#4CAF50',
    marginLeft: 8,
    marginBottom: 10,
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
  goalLabel: {
    fontSize: 16,
    color: '#1976d2',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  warningText: {
    color: '#FFD600',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  bmiExplain: {
    color: '#1976d2',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 