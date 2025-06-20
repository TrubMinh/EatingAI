import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../common/ProgressBar';
import Slider from '@react-native-community/slider';
import ContinueButton from '../ui/ContinueButton';

interface WeightLossSpeedScreenProps {
  onBack: () => void;
  onContinue: (speed: number) => void;
  currentWeight: number;
  targetWeight: number;
  tdee: number;
  minSpeed?: number;
  maxSpeed?: number;
}

export default function WeightLossSpeedScreen({
  onBack, onContinue, currentWeight, targetWeight, tdee, minSpeed = 0.1, maxSpeed = 1
}: WeightLossSpeedScreenProps) {
  const [speed, setSpeed] = useState(0.32); // kg/tuần mặc định

  // Tính toán calo deficit
  const caloDeficit = Math.round((speed * 7700) / 7); // 1kg mỡ ≈ 7700kcal
  const targetCalo = tdee - caloDeficit;

  const handleContinue = () => {
    onContinue(speed);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4CAF50', '#2196F3']} style={styles.gradient}>
        <ProgressBar current={10} total={12} />

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

        {/* Icon tốc độ */}
        <Text style={styles.speedIcon}>🏁</Text>

        {/* Question */}
        <Text style={styles.question}>Chọn tốc độ giảm cân bạn muốn theo</Text>

        {/* Đồ thị đường cong (giản lược) */}
        <View style={styles.graphRow}>
          <View style={styles.graphLabelLeft}>
            <Text style={styles.graphToday}>Hôm nay</Text>
            <View style={styles.graphWeightBox}>
              <Text style={styles.graphWeightText}>{currentWeight} kg</Text>
            </View>
            <Text style={styles.graphSubLabel}>Bạn hiện tại</Text>
          </View>
          <View style={styles.graphLine} />
          <View style={styles.graphLabelRight}>
            <Text style={styles.graphTarget}>Mục tiêu</Text>
            <View style={styles.graphWeightBoxTarget}>
              <Text style={styles.graphWeightTextTarget}>{targetWeight} kg</Text>
            </View>
            <Text style={styles.graphSubLabel}>thg {new Date().getMonth() + 1} {new Date().getDate()}</Text>
          </View>
        </View>

        {/* Info Row */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>TDEE <Text style={styles.infoIcon}>ⓘ</Text></Text>
          <Text style={styles.infoValue}>{tdee}kcal</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Thâm Hụt Calo <Text style={styles.infoIcon}>ⓘ</Text></Text>
          <Text style={styles.infoValue}>{caloDeficit}kcal</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: '#FF5722' }]}>🔥 Mục tiêu Calo <Text style={styles.infoIcon}>ⓘ</Text></Text>
          <Text style={[styles.infoValue, { color: '#FF5722' }]}>{targetCalo}kcal</Text>
        </View>

        {/* Speed Slider */}
        <Text style={styles.speedValue}>{speed.toFixed(2)} kg/tuần</Text>
        <Slider
          style={styles.slider}
          minimumValue={minSpeed}
          maximumValue={maxSpeed}
          step={0.01}
          value={speed}
          onValueChange={setSpeed}
          minimumTrackTintColor="#4CAF50"
          maximumTrackTintColor="#B2DFDB"
          thumbTintColor="#FFD700"
        />

        {/* Recommendation */}
        <Text style={styles.recommendation}>
          Khuyến nghị giảm/tăng tối đa 1 kg mỗi tuần để đạt được thành công lâu dài
        </Text>
        <TouchableOpacity>
          <Text style={styles.recommendSource}>Nguồn khuyến nghị <Text style={styles.infoIcon}>ⓘ</Text></Text>
        </TouchableOpacity>
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
  speedIcon: { fontSize: 36, textAlign: 'center', marginBottom: 8, color: '#222' },
  question: {
    fontSize: 20, fontWeight: 'bold', color: '#222', textAlign: 'center', marginBottom: 18,
  },
  graphRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 18,
    marginTop: 8,
  },
  graphLabelLeft: { alignItems: 'center' },
  graphLabelRight: { alignItems: 'center' },
  graphToday: { color: '#F44336', fontWeight: 'bold', marginBottom: 2 },
  graphTarget: { color: '#388E3C', fontWeight: 'bold', marginBottom: 2 },
  graphWeightBox: {
    backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 4, marginBottom: 2,
    borderWidth: 2, borderColor: '#F44336',
  },
  graphWeightBoxTarget: {
    backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 4, marginBottom: 2,
    borderWidth: 2, borderColor: '#388E3C',
  },
  graphWeightText: { color: '#F44336', fontWeight: 'bold', fontSize: 18 },
  graphWeightTextTarget: { color: '#388E3C', fontWeight: 'bold', fontSize: 18 },
  graphSubLabel: { color: '#222', fontSize: 13 },
  graphLine: {
    flex: 1, height: 6, borderRadius: 3, marginHorizontal: 8,
    backgroundColor: '#e0e0e0', // Không dùng linear-gradient trực tiếp, chỉ màu nền
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
  speedValue: {
    fontSize: 22, color: '#222', fontWeight: 'bold', textAlign: 'center', marginVertical: 8,
  },
  slider: { width: '100%', height: 40, marginBottom: 8 },
  recommendation: {
    fontSize: 14, color: '#222', textAlign: 'center', marginBottom: 2, marginTop: 2,
  },
  recommendSource: {
    color: '#43A047', fontWeight: 'bold', textAlign: 'center', fontSize: 15, marginBottom: 10,
  },
}); 