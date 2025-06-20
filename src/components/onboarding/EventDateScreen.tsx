import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../common/ProgressBar';
import ContinueButton from '../ui/ContinueButton';

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const years = Array.from({ length: 10 }, (_, i) => 2024 + i);

interface EventDateScreenProps {
  onBack: () => void;
  onContinue: (date: Date) => void;
}

export default function EventDateScreen({ onBack, onContinue }: EventDateScreenProps) {
  const now = new Date();
  const [day, setDay] = useState(now.getDate());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const daysInMonth = useMemo(() => getDaysInMonth(month, year), [month, year]);

  React.useEffect(() => {
    if (day > daysInMonth) setDay(daysInMonth);
  }, [day, daysInMonth]);

  const isValidDate = day <= daysInMonth;

  const handleContinue = () => {
    onContinue(new Date(year, month - 1, day));
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4CAF50', '#2196F3']} style={styles.gradient}>
        <ProgressBar current={8} total={12} />

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

        {/* Icon lịch */}
        <Text style={styles.calendarIcon}>🗓️</Text>

        {/* Question */}
        <Text style={styles.question}>Sự kiện này sẽ diễn ra khi nào?</Text>

        {/* Picker row */}
        <View style={styles.pickerRow}>
          <View style={styles.pickerBox}>
            <Text style={styles.pickerLabel}>Ngày</Text>
            <Picker
              selectedValue={day}
              style={styles.picker}
              onValueChange={setDay}
              dropdownIconColor="#2196F3"
            >
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => (
                <Picker.Item key={d} label={d.toString()} value={d} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerBox}>
            <Text style={styles.pickerLabel}>Tháng</Text>
            <Picker
              selectedValue={month}
              style={styles.picker}
              onValueChange={setMonth}
              dropdownIconColor="#2196F3"
            >
              {months.map(m => (
                <Picker.Item key={m} label={m.toString()} value={m} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerBox}>
            <Text style={styles.pickerLabel}>Năm</Text>
            <Picker
              selectedValue={year}
              style={styles.picker}
              onValueChange={setYear}
              dropdownIconColor="#2196F3"
            >
              {years.map(y => (
                <Picker.Item key={y} label={y.toString()} value={y} />
              ))}
            </Picker>
          </View>
        </View>
        {/* Ngày đã chọn */}
        <Text style={styles.selectedDate}>{`${day}/${month}/${year}`}</Text>

        {/* Cảnh báo nếu ngày không hợp lệ */}
        {!isValidDate && (
          <Text style={styles.warningText}>⚠️ Ngày không hợp lệ cho tháng/năm đã chọn!</Text>
        )}
      </LinearGradient>
      <ContinueButton onPress={handleContinue} disabled={!isValidDate} />
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
  calendarIcon: { fontSize: 36, textAlign: 'center', marginBottom: 8, color: '#222' },
  question: {
    fontSize: 20, fontWeight: 'bold', color: '#222', textAlign: 'center', marginBottom: 18,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  pickerBox: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    marginHorizontal: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
    width: 90,
    elevation: 2,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  pickerLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
    fontWeight: '500',
  },
  picker: {
    width: 80,
    height: 54,
    backgroundColor: '#fff',
    color: '#222',
  },
  selectedDate: {
    color: '#1976d2',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  warningText: {
    color: '#FFD600',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
}); 