import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
  current: number; // step hiện tại (bắt đầu từ 1)
  total: number;   // tổng số bước
  height?: number;
  backgroundColor?: string;
  barColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  height = 8,
  backgroundColor = 'rgba(255,255,255,0.2)',
  barColor = '#fff',
}) => {
  const progress = Math.max(0, Math.min(1, current / total));
  return (
    <View style={[styles.container, { height, backgroundColor }]}> 
      <View style={[styles.bar, { width: `${progress * 100}%`, backgroundColor: barColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 20,
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
});

export default ProgressBar; 