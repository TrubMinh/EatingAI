import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../../src/constants/colors';
import { useRouter } from 'expo-router';

function ProfileHeader() {
  return (
    <View style={styles.profileHeader}>
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>NVA</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.name}>Nguyễn Văn A</Text>
        <Text style={styles.email}>nguyenvana@gmail.com</Text>
      </View>
    </View>
  );
}

function MenuItem({ icon, title, onPress }: { icon: string; title: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuIcon}>{icon}</Text>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuArrow}>›</Text>
    </TouchableOpacity>
  );
}

export default function AccountScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // Chuyển hướng về màn hình chính
    router.replace('/');
  };

  const handleProfilePress = () => {
    router.push('/account/profile');
  };

  const handleGoalsPress = () => {
    router.push('/account/goals');
  };

  const handleWeightPress = () => {
    router.push('/account/weight');
  };

  const handleStatsPress = () => {
    router.push('/account/stats');
  };

  const handleNotificationsPress = () => {
    router.push('/account/notifications');
  };

  const handleSecurityPress = () => {
    router.push('/account/security');
  };

  const handleLanguagePress = () => {
    router.push('/account/language');
  };

  const handleHelpPress = () => {
    router.push('/account/help');
  };

  const handleTermsPress = () => {
    router.push('/account/terms');
  };

  const handlePrivacyPress = () => {
    router.push('/account/privacy');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        <View style={styles.menuSection}>
          <MenuItem icon="👤" title="Thông tin cá nhân" onPress={handleProfilePress} />
          <MenuItem icon="🎯" title="Mục tiêu" onPress={handleGoalsPress} />
          <MenuItem icon="⚖️" title="Cân nặng" onPress={handleWeightPress} />
          <MenuItem icon="📊" title="Thống kê" onPress={handleStatsPress} />
        </View>
        <View style={styles.menuSection}>
          <MenuItem icon="🔔" title="Thông báo" onPress={handleNotificationsPress} />
          <MenuItem icon="🔒" title="Bảo mật" onPress={handleSecurityPress} />
          <MenuItem icon="🌐" title="Ngôn ngữ" onPress={handleLanguagePress} />
        </View>
        <View style={styles.menuSection}>
          <MenuItem icon="❓" title="Trợ giúp" onPress={handleHelpPress} />
          <MenuItem icon="📝" title="Điều khoản" onPress={handleTermsPress} />
          <MenuItem icon="📄" title="Chính sách" onPress={handlePrivacyPress} />
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  menuSection: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  menuArrow: {
    fontSize: 20,
    color: COLORS.textSecondary,
  },
  logoutButton: {
    backgroundColor: COLORS.error,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 