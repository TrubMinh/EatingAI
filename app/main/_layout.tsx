import { Tabs } from 'expo-router';
import { COLORS } from '../../src/constants/colors';
import { Text } from 'react-native';

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          height: 60,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 4,
        },
        tabBarIconStyle: {
          fontSize: 24,
        },
      }}
    >
      <Tabs.Screen
        name="expert"
        options={{
          tabBarLabel: 'Chuyên gia',
          tabBarIcon: ({ color }) => <Text style={{ color }}>👨‍⚕️</Text>,
        }}
      />

      <Tabs.Screen
        name="nutrition"
        options={{
          tabBarLabel: 'Chế độ ăn',
          tabBarIcon: ({ color }) => <Text style={{ color }}>🍽️</Text>,
        }}      
        />
        <Tabs.Screen
        name="diary"
        options={{
          tabBarLabel: 'Nhật ký',
          tabBarIcon: ({ color }) => <Text style={{ color }}>📝</Text>,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({ color }) => <Text style={{ color }}>👤</Text>,
        }}
      />
    </Tabs>
  );
} 

