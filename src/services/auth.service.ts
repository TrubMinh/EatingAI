/*
import { auth } from '../config/firebase';
import { supabase } from '../config/supabase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User
} from 'firebase/auth';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  weight?: number;
  height?: number;
  goals?: string[];
}

export const authService = {
  async register(email: string, password: string, userData: Partial<UserProfile>) {
    try {
      // Đăng ký với Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Lưu thông tin người dùng vào Supabase
      const { error } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.uid,
            email: email,
            full_name: userData.fullName,
            avatar: userData.avatar,
            weight: userData.weight,
            height: userData.height,
            goals: userData.goals
          }
        ]);

      if (error) throw error;
      return user;
    } catch (error) {
      throw error;
    }
  },

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  async signOut() {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      throw error;
    }
  },

  async getCurrentUser(): Promise<User | null> {
    return auth.currentUser;
  },

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async updateUserProfile(userId: string, updates: Partial<UserProfile>) {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);

      if (error) throw error;
    } catch (error) {
      throw error;
    }
  }
};
*/

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export async function dangNhapFirebase(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    // Xử lý lỗi tiếng Việt
    let message = 'Đã xảy ra lỗi. Vui lòng thử lại!';
    if (error.code === 'auth/user-not-found') message = 'Không tìm thấy tài khoản.';
    else if (error.code === 'auth/wrong-password') message = 'Sai mật khẩu.';
    else if (error.code === 'auth/invalid-email') message = 'Email không hợp lệ.';
    throw new Error(message);
  }
} 