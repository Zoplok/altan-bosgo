'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '@/types';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut as fbSignOut } from 'firebase/auth';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, role?: UserProfile['role']) => void;
  register: (name: string, email: string, role: UserProfile['role'], educationLevel: string) => void;
  logout: () => void;
  toggleSaveUniversity: (id: string) => void;
  isSavedUniversity: (id: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check local storage first
    try {
      const savedUser = localStorage.getItem('altan_bosgo_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      // ignore
    }

    // Also listen to Firebase auth if available
    let unsubscribe = () => {};
    if (auth) {
      unsubscribe = onAuthStateChanged(auth, (fbUser) => {
        if (fbUser) {
          const profile: UserProfile = {
            uid: fbUser.uid,
            email: fbUser.email || 'student@altanbosgo.mn',
            displayName: fbUser.displayName || 'Суралцагч',
            role: 'STUDENT',
            educationLevel: '12-р анги төгсөгч',
            savedUniversities: user?.savedUniversities || ['num', 'must'],
            savedMajors: user?.savedMajors || ['major-se'],
            savedScholarships: user?.savedScholarships || ['sch-ilgeelt-2100'],
            createdAt: new Date().toISOString(),
          };
          setUser(profile);
          localStorage.setItem('altan_bosgo_user', JSON.stringify(profile));
        }
      });
    }

    setLoading(false);
    return () => unsubscribe();
  }, []);

  const login = (email: string, role: UserProfile['role'] = 'STUDENT') => {
    const mockUser: UserProfile = {
      uid: 'user-' + Date.now(),
      email,
      displayName: email.split('@')[0] || 'Хэрэглэгч',
      role,
      educationLevel: '12-р анги',
      savedUniversities: ['num', 'must'],
      savedMajors: ['major-se', 'major-ai'],
      savedScholarships: ['sch-ilgeelt-2100'],
      createdAt: new Date().toISOString(),
    };
    setUser(mockUser);
    localStorage.setItem('altan_bosgo_user', JSON.stringify(mockUser));
  };

  const register = (name: string, email: string, role: UserProfile['role'], educationLevel: string) => {
    const newUser: UserProfile = {
      uid: 'user-' + Date.now(),
      email,
      displayName: name,
      role,
      educationLevel,
      savedUniversities: ['num'],
      savedMajors: [],
      savedScholarships: [],
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('altan_bosgo_user', JSON.stringify(newUser));
  };

  const logout = () => {
    if (auth) {
      fbSignOut(auth).catch(() => {});
    }
    setUser(null);
    localStorage.removeItem('altan_bosgo_user');
  };

  const toggleSaveUniversity = (id: string) => {
    if (!user) {
      // Allow guest bookmarks too
      const guestSaved = JSON.parse(localStorage.getItem('altan_bosgo_guest_saved') || '[]');
      const updated = guestSaved.includes(id)
        ? guestSaved.filter((i: string) => i !== id)
        : [...guestSaved, id];
      localStorage.setItem('altan_bosgo_guest_saved', JSON.stringify(updated));
      return;
    }

    const currentSaved = user.savedUniversities || [];
    const updated = currentSaved.includes(id)
      ? currentSaved.filter((i) => i !== id)
      : [...currentSaved, id];

    const updatedUser = { ...user, savedUniversities: updated };
    setUser(updatedUser);
    localStorage.setItem('altan_bosgo_user', JSON.stringify(updatedUser));
  };

  const isSavedUniversity = (id: string) => {
    if (!user) {
      if (typeof window === 'undefined') return false;
      const guestSaved = JSON.parse(localStorage.getItem('altan_bosgo_guest_saved') || '[]');
      return guestSaved.includes(id);
    }
    return (user.savedUniversities || []).includes(id);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, toggleSaveUniversity, isSavedUniversity }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
