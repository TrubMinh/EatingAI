import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../common/ProgressBar';
import ContinueButton from '../ui/ContinueButton';

interface NameScreenProps {
  onBack: () => void;
  onContinue: (name: string) => void;
}

export default function NameScreen({ onBack, onContinue }: NameScreenProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<TextInput>(null);

  React.useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, []);

  const handleContinue = () => {
    if (!name.trim()) {
      setError('Vui lòng nhập tên của bạn');
      return;
    }
    setError('');
    Keyboard.dismiss();
    onContinue(name.trim());
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4CAF50', '#2196F3']} style={styles.gradient}>
        <ProgressBar current={12} total={12} />

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

        {/* Input & Label */}
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Tt"
            placeholderTextColor="#888"
            maxLength={32}
            autoCapitalize="words"
            returnKeyType="done"
            onSubmitEditing={handleContinue}
          />
          <Text style={styles.label}>Tên của bạn là gì?</Text>
          {!!error && <Text style={styles.error}>{error}</Text>}
        </View>
      </LinearGradient>
      <ContinueButton onPress={handleContinue} disabled={!name} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1, padding: 20 },
  backButton: {
    position: 'absolute', left: 20, top: 40, zIndex: 10,
  },
  backButtonText: { fontSize: 32, color: '#222' },
  logoContainer: { alignItems: 'center', marginBottom: 10 },
  appName: { fontSize: 36, fontWeight: 'bold', color: '#222' },
  appNameHighlight: { color: '#4CAF50' },
  illustration: { width: 120, height: 120, alignSelf: 'center', marginBottom: 10 },
  inputContainer: { alignItems: 'center', marginTop: 10, marginBottom: 30 },
  input: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#222',
    borderBottomWidth: 3,
    borderBottomColor: '#4CAF50',
    width: 220,
    textAlign: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 20,
    color: '#222',
    marginTop: 8,
    fontWeight: '500',
    textAlign: 'center',
  },
  error: {
    color: '#F44336',
    fontSize: 14,
    marginTop: 6,
  },
}); 