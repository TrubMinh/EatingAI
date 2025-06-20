import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { OnboardingData } from '../../types';

interface OnboardingSummaryScreenProps {
  data: Partial<OnboardingData>;
  onStart: () => void;
}

const infoList = [
  { key: 'gender', label: 'Giới tính', icon: '⚧', getValue: (d: any) => d.gender === 'male' ? 'Nam' : 'Nữ' },
  { key: 'height', label: 'Chiều cao', icon: '📏', getValue: (d: any) => `${d.height} cm` },
  { key: 'age', label: 'Tuổi', icon: '🎂', getValue: (d: any) => d.age },
  { key: 'weight', label: 'Cân nặng', icon: '⚖️', getValue: (d: any) => `${d.weight} kg` },
  { key: 'goal', label: 'Mục tiêu', icon: '🎯', getValue: (d: any) => d.goal === 'lose_weight' ? 'Giảm cân' : d.goal === 'gain_weight' ? 'Tăng cân' : 'Cải thiện sức khỏe' },
  { key: 'targetWeight', label: 'Cân nặng mục tiêu', icon: '🏁', getValue: (d: any) => `${d.targetWeight} kg` },
  { key: 'eventDate', label: 'Ngày sự kiện', icon: '🗓️', getValue: (d: any) => `tháng ${d.eventDate.getMonth() + 1} ${d.eventDate.getFullYear()}` },
  { key: 'activityLevel', label: 'Mức độ hoạt động', icon: '👟', getValue: (d: any) => d.activityLevel === 'sedentary' ? 'Ít vận động' : d.activityLevel === 'light' ? 'Nhẹ' : d.activityLevel === 'moderate' ? 'Vừa phải' : 'Rất năng động' },
  { key: 'weightLossSpeed', label: 'Tốc độ giảm cân', icon: '😊', getValue: (d: any) => `${d.weightLossSpeed} kg/tuần` },
  { key: 'healthCondition', label: 'Hạn chế', icon: '⚠️', getValue: (d: any) => d.healthCondition === 'none' ? 'Không có' : d.healthCondition },
];

export default function OnboardingSummaryScreen({ data, onStart }: OnboardingSummaryScreenProps) {
  const {
    gender = 'male',
    age = 25,
    height = 170,
    weight = 70,
    targetWeight = 65,
    goal = 'lose_weight',
    eventDate = new Date(),
    activityLevel = 'sedentary',
    weightLossSpeed = 0.32,
    healthCondition = 'none',
    name = '',
  } = data;
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(1);
  const router = useRouter();

  useEffect(() => {
    let interval: any;
    let current = 1;
    interval = setInterval(() => {
      current += 2;
      if (current >= 99) {
        current = 99;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 300);
      }
      setPercent(current);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const handleStart = async () => {
    setLoading(true);
    try {
      router.replace('/main/diary');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể chuyển sang trang chính.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}> 
        <Text style={styles.percent}>{percent}%</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
        </View>
        <Text style={styles.loadingText}>Đang tổng hợp thông tin...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#fff', '#e3f6fd']} style={styles.gradient}>
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
        {/* Info List */}
        <View style={styles.infoList}>
          {infoList.map(item => (
            <View key={item.key} style={styles.infoRow}>
              <Text style={styles.infoIcon}>{item.icon}</Text>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.getValue(data)}</Text>
              <Text style={styles.checkIcon}>✔️</Text>
            </View>
          ))}
        </View>
        {/* Progress & Percent */}
        <Text style={styles.percent}>99%</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: '99%' }]} />
        </View>
        {/* Start Button */}
        <View style={{ marginTop: 30 }}>
          <Text style={{ textAlign: 'center', color: '#888', marginBottom: 10 }}>
            Bạn đã sẵn sàng?
          </Text>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={styles.startButton}
              onPress={handleStart}
              disabled={loading}
            >
              Bắt đầu sử dụng
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  gradient: { flex: 1, padding: 20 },
  logoContainer: { alignItems: 'center', marginBottom: 10 },
  appName: { fontSize: 36, fontWeight: 'bold', color: '#222' },
  appNameHighlight: { color: '#4CAF50' },
  illustration: { width: 120, height: 120, alignSelf: 'center', marginBottom: 10 },
  infoList: { marginVertical: 10 },
  infoRow: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 8, paddingVertical: 4,
  },
  infoIcon: { fontSize: 22, width: 32, textAlign: 'center' },
  infoLabel: { fontSize: 16, color: '#222', width: 120 },
  infoValue: { fontSize: 16, color: '#222', fontWeight: 'bold', flex: 1 },
  checkIcon: { fontSize: 18, color: '#4CAF50', marginLeft: 6 },
  percent: { fontSize: 32, color: '#222', fontWeight: 'bold', textAlign: 'center', marginTop: 16 },
  progressBarBg: {
    height: 8, backgroundColor: '#e0e0e0', borderRadius: 8, marginTop: 8, marginHorizontal: 10,
  },
  progressBarFill: {
    height: 8, backgroundColor: '#4CAF50', borderRadius: 8,
  },
  loadingText: {
    marginTop: 18,
    fontSize: 18,
    color: '#222',
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    overflow: 'hidden',
    textAlign: 'center',
    marginTop: 8,
  },
}); 