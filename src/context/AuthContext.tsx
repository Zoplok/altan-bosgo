'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '@/types';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut as fbSignOut } from 'firebase/auth';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  guestSavedUnis: string[];
  guestSavedMajors: string[];
  guestSavedScholarships: string[];
  login: (email: string, role?: UserProfile['role']) => void;
  register: (name: string, email: string, role: UserProfile['role'], educationLevel: string) => void;
  logout: () => void;
  toggleSaveUniversity: (id: string) => void;
  isSavedUniversity: (id: string) => boolean;
  toggleSaveMajor: (id: string) => void;
  isSavedMajor: (id: string) => boolean;
  toggleSaveScholarship: (id: string) => void;
  isSavedScholarship: (id: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [guestSavedUnis, setGuestSavedUnis] = useState<string[]>([]);
  const [guestSavedMajors, setGuestSavedMajors] = useState<string[]>([]);
  const [guestSavedScholarships, setGuestSavedScholarships] = useState<string[]>([]);

  useEffect(() => {
    // Check local storage first
    try {
      const savedUser = localStorage.getItem('altan_bosgo_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      const savedGuestUnis = localStorage.getItem('altan_bosgo_guest_saved');
      if (savedGuestUnis) {
        setGuestSavedUnis(JSON.parse(savedGuestUnis));
      }
      const savedGuestM = localStorage.getItem('altan_bosgo_guest_majors');
      if (savedGuestM) {
        setGuestSavedMajors(JSON.parse(savedGuestM));
      }
      const savedGuestS = localStorage.getItem('altan_bosgo_guest_scholarships');
      if (savedGuestS) {
        setGuestSavedScholarships(JSON.parse(savedGuestS));
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
            savedUniversities: ['num', 'must'],
            savedMajors: ['major-se'],
            savedScholarships: ['sch-ilgeelt-2100'],
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
      savedUniversities: guestSavedUnis.length > 0 ? guestSavedUnis : ['num', 'must'],
      savedMajors: guestSavedMajors.length > 0 ? guestSavedMajors : ['major-se', 'major-ai'],
      savedScholarships: guestSavedScholarships.length > 0 ? guestSavedScholarships : ['sch-ilgeelt-2100'],
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
      savedUniversities: guestSavedUnis.length > 0 ? guestSavedUnis : ['num'],
      savedMajors: guestSavedMajors,
      savedScholarships: guestSavedScholarships,
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
      const updated = guestSavedUnis.includes(id)
        ? guestSavedUnis.filter((i) => i !== id)
        : [...guestSavedUnis, id];
      setGuestSavedUnis(updated);
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
      return guestSavedUnis.includes(id);
    }
    return (user.savedUniversities || []).includes(id);
  };

  const toggleSaveMajor = (id: string) => {
    if (!user) {
      const updated = guestSavedMajors.includes(id)
        ? guestSavedMajors.filter((i) => i !== id)
        : [...guestSavedMajors, id];
      setGuestSavedMajors(updated);
      localStorage.setItem('altan_bosgo_guest_majors', JSON.stringify(updated));
      return;
    }

    const current = user.savedMajors || [];
    const updated = current.includes(id)
      ? current.filter((i) => i !== id)
      : [...current, id];
    const updatedUser = { ...user, savedMajors: updated };
    setUser(updatedUser);
    localStorage.setItem('altan_bosgo_user', JSON.stringify(updatedUser));
  };

  const isSavedMajor = (id: string) => {
    if (!user) {
      return guestSavedMajors.includes(id);
    }
    return (user.savedMajors || []).includes(id);
  };

  const toggleSaveScholarship = (id: string) => {
    if (!user) {
      const updated = guestSavedScholarships.includes(id)
        ? guestSavedScholarships.filter((i) => i !== id)
        : [...guestSavedScholarships, id];
      setGuestSavedScholarships(updated);
      localStorage.setItem('altan_bosgo_guest_scholarships', JSON.stringify(updated));
      return;
    }

    const current = user.savedScholarships || [];
    const updated = current.includes(id)
      ? current.filter((i) => i !== id)
      : [...current, id];
    const updatedUser = { ...user, savedScholarships: updated };
    setUser(updatedUser);
    localStorage.setItem('altan_bosgo_user', JSON.stringify(updatedUser));
  };

  const isSavedScholarship = (id: string) => {
    if (!user) {
      return guestSavedScholarships.includes(id);
    }
    return (user.savedScholarships || []).includes(id);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        guestSavedUnis,
        guestSavedMajors,
        guestSavedScholarships,
        login,
        register,
        logout,
        toggleSaveUniversity,
        isSavedUniversity,
        toggleSaveMajor,
        isSavedMajor,
        toggleSaveScholarship,
        isSavedScholarship,
      }}
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
