import { Stack } from 'expo-router';
import { useOnboarding } from '../src/hooks/useOnboarding';

export default function Layout() {
  const { step } = useOnboarding();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="main" />
    </Stack>
  );
} 