import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface OnboardingScreenProps {
  onContinue: () => void;
  onLogin: () => void;
  onSync: () => void;
}

export default function OnboardingScreen({ onContinue, onLogin, onSync }: OnboardingScreenProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#2196F3']}
        style={styles.gradient}
      >
        {/* Logo and App Name */}
        <View style={styles.logoContainer}>
          <Text style={styles.appName}>
            Diet<Text style={styles.appNameHighlight}>AI</Text>
          </Text>
          <Text style={styles.tagline}>Trợ lý dinh dưỡng thông minh</Text>
        </View>

        {/* Main Illustration */}
        <Image
          source={require('../../../assets/images/onboarding-illustration.png')}
          style={styles.illustration}
          resizeMode="contain"
        />

        {/* Features List */}
        <View style={styles.featuresContainer}>
          <FeatureItem icon="🎯" title="Kế hoạch cá nhân hóa" description="Được thiết kế riêng cho bạn" />
          <FeatureItem icon="📊" title="Theo dõi tiến độ" description="Theo dõi cân nặng và mục tiêu" />
          <FeatureItem icon="🍎" title="Thực đơn thông minh" description="Gợi ý món ăn phù hợp" />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={onContinue}>
            <Text style={styles.primaryButtonText}>Bắt đầu ngay</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={onLogin}>
            <Text style={styles.secondaryButtonText}>Đăng nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.syncButton} onPress={onSync}>
            <Text style={styles.syncButtonText}>Đồng bộ với Google Health</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

function FeatureItem({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <View style={styles.featureTextContainer}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
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
    marginTop: 40,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  appNameHighlight: {
    color: '#FFD700',
  },
  tagline: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
  },
  illustration: {
    width: '100%',
    height: 200,
    marginVertical: 30,
  },
  featuresContainer: {
    marginVertical: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  syncButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  syncButtonText: {
    color: '#fff',
    fontSize: 16,
  },
}); 